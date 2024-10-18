import { Avatar, Checkbox, Button, cn } from "@nextui-org/react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { CgTrash } from "react-icons/cg";
import apiDeleteData from "@/pages/api/apiDeleteData";
import toast from "react-hot-toast";
import { useEffect } from "react";
import apiGetData from "@/pages/api/apiGetData";
import apiPostData from "@/pages/api/apiPostData";
import { useDispatch } from "react-redux";
import { setList, setCount } from "@/redux/slices/cartListSlice";

export const CartListCheckbox = ({ data, value }) => {
	const { deleteData } = apiDeleteData();
	const { postData } = apiPostData();
	const { getDataAuth } = apiGetData();
	const dispatch = useDispatch();

	useEffect(() => {
		if (data?.qty !== undefined) {
			if (data?.qty <= 0) {
				handleDeleteCart(data?.id);
			}
		}
	}, [data?.qty]);

	const handleReduceQty = async (id, title, qty) => {
		const res = await postData(`update-cart/${id}`, { quantity: qty - 1 });
		if (res.status === 200) {
			getDataAuth("carts", (res) => dispatch(setList(res?.data.data)));
			if (qty > 1) {
				toast.success(`Qty ${title} updated`);
			}
		} else {
			toast.error("Failed to update qty");
		}
	};

	const handleAddQty = async (id, title, qty) => {
		const res = await postData(`update-cart/${id}`, { quantity: qty + 1 });
		if (res.status === 200) {
			getDataAuth("carts", (res) => dispatch(setList(res?.data.data)));
			toast.success(`Qty ${title} updated`);
		} else {
			toast.error("Failed to update qty");
		}
	};

	const handleDeleteCart = async (id) => {
		const res = await deleteData(`delete-cart/${id}`);
		if (res.status === 200) {
			getDataAuth("carts", (res) => dispatch(setList(res?.data.data)));
			getDataAuth("carts", (res) => dispatch(setCount(res?.data.data.length)));
			toast.success("Destination deleted from cart");
		} else {
			toast.error("Failed to delete cart");
		}
	};

	return (
		<Checkbox
			aria-label={data?.title}
			classNames={{
				base: cn("inline-flex max-w-full w-full bg-content1 m-0", "hover:bg-content2 items-center justify-start", "cursor-pointer rounded-lg gap-2 px-2 py-3 border-2 border-transparent", "data-[selected=true]:border-primary shadow-md"),
				label: "w-full",
			}}
			value={value}>
			<div className="flex flex-row items-center justify-between gap-2 flex-nowrap">
				<Avatar isBordered radius="sm" src={data?.imageUrl} size="lg" alt={data?.title} className="w-16 h-14 min-w-14" />
				<div className="flex flex-col justify-between w-full gap-2 lg:flex-row">
					<div className="flex flex-col">
						<h1 className="text-sm font-medium capitalize text-wrap text-inherit">{data?.title}</h1>
						<p className="inline text-tiny text-foreground-400">{data?.price}</p>
					</div>
					<div className="z-50 flex flex-row items-center justify-end gap-1">
						<div className="flex flex-row items-center gap-2 flex-nowrap">
							<Button isIconOnly aria-label="reduce qty" onClick={() => handleReduceQty(data?.id, data?.title, data?.qty)} className="bg-transparent !min-w-6 h-6 !w-6">
								<CiSquareMinus size={20} className="text-foreground-400" />
							</Button>
							<p className="text-base text-center min-w-3 max-w-3 text-foreground-400">{data?.qty}</p>
							<Button isIconOnly aria-label="add qty" onClick={() => handleAddQty(data?.id, data?.title, data?.qty)} className="bg-transparent !min-w-6 h-6 !w-6">
								<CiSquarePlus size={20} className="text-foreground-400" />
							</Button>
						</div>
						<Button isIconOnly onClick={() => handleDeleteCart(data?.id)} aria-label="delete list" className="bg-transparent !min-w-6 h-6 !w-6">
							<CgTrash size={20} className="text-red-500" />
						</Button>
					</div>
				</div>
			</div>
		</Checkbox>
	);
};
