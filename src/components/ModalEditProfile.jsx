import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import apiAuth from "@/pages/api/apiAuth";
import apiUpload from "@/pages/api/apiUpload";
import apiPostData from "@/pages/api/apiPostData";
import { noImage } from "@/helpers/const";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setData } from "@/redux/slices/userLoggedSlice";

const EditModal = ({ showEditModal, setShowEditModal, dataUser }) => {
	const { userLog } = apiAuth();
	const { upload } = apiUpload();
	const { postData } = apiPostData();
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const [imageUrlUploaded, setImageUrlUploaded] = useState(null);
	const [errImage, setErrImage] = useState(false);
	const [errMsgImage, setMsgErrImage] = useState("");

	const handleUpload = async (e) => {
		e.preventDefault();

		const file = e.target.files[0];

		if (!file) {
			return;
		} else if (!file.type.startsWith("image/")) {
			setImageUrlUploaded(null);
			setErrImage(true);
			setMsgErrImage("Format file must be jpg, jpeg or png");
			toast.error("The file must be an image in \n jpg, jpeg or png format.");

			return false;
		}

		const dataImage = new FormData();
		dataImage.append("image", file);

		try {
			const res = await upload("upload-image", dataImage);
			setErrImage(false);
			setMsgErrImage("");
			setImageUrlUploaded(res?.data.url);
			setTimeout(() => {
				toast.success("Image uploaded");
			}, 1500);
			return res?.data.url;
		} catch (err) {
			setImageUrlUploaded(null);
			setErrImage(true);
			setMsgErrImage("Format file must be jpg, jpeg or png");
			toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			name: e.target.name.value,
			email: e.target.email.value,
			phoneNumber: e.target.phonenumber.value,
			profilePictureUrl: imageUrlUploaded || dataUser?.profilePictureUrl,
		};

		for (const key in payload) {
			if (!payload[key]) {
				toast.error("Please input all fields!");
				return;
			}
		}

		const res = await postData("update-profile", payload);
		if (res?.status === 200) {
			toast.success("Profile successfully updated");
			getUserLogged();
			setShowEditModal(false);
			setImageUrlUploaded(null);
		} else {
			toast.error("Failed to update profile");
		}
	};

	const getUserLogged = () => {
		const token = getCookie("token");
		// set user data when token is not null
		if (token) {
			userLog("user", (res) => dispatch(setData(res)));
		}
	};

	const handleClose = () => {
		formRef.current.reset();
		setImageUrlUploaded(null);
	};

	return (
		<Modal
			isOpen={showEditModal}
			size="3xl"
			onClose={() => {
				setShowEditModal(false);
				handleClose();
			}}
			placement="center"
			isDismissable={false}
			isKeyboardDismissDisabled={true}
			classNames={{
				backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
			}}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<div className="mx-2 my-4 align-center">Edit Profile</div>
						</ModalHeader>
						<form ref={formRef} className="mb-5 space-y-2" onSubmit={handleSubmit}>
							<ModalBody>
								<div className="flex flex-wrap gap-2 md:flex-nowrap">
									<div className="flex flex-wrap w-full mx-auto md:w-2/4">
										<div className="overflow-hidden rounded-md w-full h-[200px]">
											<img src={imageUrlUploaded === null ? dataUser?.profilePictureUrl : imageUrlUploaded} onError={(e) => (e.target.src = noImage)} className="object-cover object-center w-full h-full scale-100 rounded-md" alt="profile picture" />
										</div>
										<input type="file" accept="image/*" onChange={handleUpload} id="dataimage" name="dataimage" className="block w-full px-1 py-2 mt-2 text-sm border-2 border-gray-200 rounded-lg cursor-pointer text-primary hover:border-gray-400 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
										{errImage && <p className="text-tiny text-danger">{errMsgImage}</p>}
									</div>
									<div className="flex flex-wrap w-full space-y-1.5 md:space-y-3 md:h-fit md:w-2/4">
										<Input type="text" id="name" size="sm" label="Name" name="name" defaultValue={dataUser?.name} className="max-w-full" autoComplete="off" variant="bordered" color="primary" autoFocus />
										<Input type="email" id="email" size="sm" label="Email" name="email" defaultValue={dataUser?.email} className="max-w-full" autoComplete="off" variant="bordered" color="primary" />
										<Input type="text" id="phonenumber" size="sm" label="Phone Number" name="phonenumber" defaultValue={dataUser?.phoneNumber} className="max-w-full" autoComplete="off" variant="bordered" color="primary" />
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" onPress={onClose} onClick={handleClose}>
									Cancel
								</Button>
								<Button type="submit" className="bg-bluenavy text-gray-50">
									Save
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default EditModal;
