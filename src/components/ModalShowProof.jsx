import { Button, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { noImage } from "@/helpers/const";

const ProofModal = ({ showProofModal, setShowProofModal, proofImageUrl }) => {
	return (
		<Modal
			isOpen={showProofModal}
			onClose={() => {
				setShowProofModal(false);
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
							<div className="mx-2 my-4 align-center">Proof of payment</div>
						</ModalHeader>
						<ModalBody>
							<Image src={proofImageUrl} fallbackSrc={noImage} removeWrapper width={300} height={320} className="object-cover w-full" alt="proof of payment" />
						</ModalBody>
						<ModalFooter>
							<Button className="text-white bg-bluenavy" onPress={onClose}>
								Back
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ProofModal;
