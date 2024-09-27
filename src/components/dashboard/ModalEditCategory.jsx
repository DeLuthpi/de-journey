import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import apiUpload from "@/pages/api/apiUpload";
import apiPostData from "@/pages/api/apiPostData";
import validateImage from "@/utils/validationImage";
import { noImage } from "@/helpers/const";

const EditModal = ({ showEditModal, setShowEditModal, selectedCategory }) => {
	const { upload } = apiUpload();
	const { postData } = apiPostData();
	const [name, setName] = useState("");
	const [imageUrlUploaded, setImageUrlUploaded] = useState(null);
	const [errImage, setErrImage] = useState(false);
	const [errMsgImage, setMsgErrImage] = useState("");
	const { validateImg } = validateImage();

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
			return res.data.url;
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
			imageUrl: imageUrlUploaded || selectedCategory?.imageUrl,
		};

		for (const key in payload) {
			if (!payload[key]) {
				toast.error("Please input all fields!");
				return;
			}
		}

		const res = await postData(`update-category/${selectedCategory.id}`, payload);
		if (res.status === 200) {
			toast.success("Category successfully updated");
			setShowEditModal(false);
			setName("");
			setImageUrlUploaded(null);
		} else {
			toast.error("Failed to update category");
		}
	};

	const handleClose = () => {
		setName("");
		setImageUrlUploaded(null);
	};

	return (
		<Modal
			isOpen={showEditModal}
			onClose={() => setShowEditModal(false)}
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
							<div className="mx-2 my-4 align-center">Update Category</div>
						</ModalHeader>
						<form className="mb-5 space-y-2 md:space-y-3" onSubmit={handleSubmit}>
							<ModalBody>
								<img width={200} height={200} alt="image" className="w-full rounded-lg object-cover h-[165px]" src={imageUrlUploaded === null ? (validateImg(selectedCategory?.imageUrl) ? selectedCategory?.imageUrl : noImage) : imageUrlUploaded} />
								<Input type="text" defaultValue={selectedCategory?.name} id="name" size="sm" label="Name" name="name" isRequired className="max-w-full" onChange={(e) => setName(e.target.value)} autoComplete="off" variant="bordered" color="primary" autoFocus />
								<input type="file" accept="image/*" onChange={handleUpload} id="profilepicture" name="profilepicture" className="block w-full px-1 py-2 mb-5 text-sm border-2 border-gray-200 rounded-lg cursor-pointer text-primary hover:border-gray-400 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
								{errImage && <p className="text-tiny text-danger">{errMsgImage}</p>}
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
