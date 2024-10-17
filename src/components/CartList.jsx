import { Avatar, Checkbox, Button, cn } from "@nextui-org/react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { CgTrash } from "react-icons/cg";
import apiDeleteData from "@/pages/api/apiDeleteData";
import toast from "react-hot-toast";

export const CartListCheckbox = ({ data, value }) => {
	const { deleteData } = apiDeleteData();

	const handleDeleteCart = async (id) => {
		const res = await deleteData(`delete-cart/${id}`);
		if (res.status === 200) {
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
							<Button isIconOnly aria-label="reduce qty" className="bg-transparent !min-w-6 h-6 !w-6">
								<CiSquareMinus size={20} className="text-foreground-400" />
							</Button>
							<p className="text-base text-foreground-400">{data?.qty}</p>
							<Button isIconOnly aria-label="add qty" className="bg-transparent !min-w-6 h-6 !w-6">
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
