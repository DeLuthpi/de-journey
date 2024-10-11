import { Button, Card, CardBody, Modal, ModalContent, ModalBody, Snippet } from "@nextui-org/react";
import { noImage } from "@/helpers/const";
import currency from "currency.js";

const ViewModal = ({ showViewModal, setShowViewModal, selectedPromo }) => {
	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	return (
		<Modal
			isOpen={showViewModal}
			size="5xl"
			onClose={() => {
				setShowViewModal(false);
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
						<ModalBody>
							<div className="flex flex-wrap gap-2 py-2 md:flex-nowrap">
								<div className="flex flex-wrap w-full mx-auto md:w-2/5">
									<div className="space-y-1 w-[365px] h-[200px] mb-8">
										<div className="overflow-hidden rounded-md w-[365px] h-[200px]">
											<img src={selectedPromo?.imageUrl || noImage} className="object-cover object-center w-full h-full scale-100 rounded-md" alt="img-show" draggable="none" />
										</div>
									</div>
								</div>
								<div className="flex flex-wrap w-full space-y-2 md:w-3/5 md:space-y-3 md:h-fit">
									<h2 className="text-3xl font-bold text-bluenavy">{selectedPromo?.title}</h2>
									<Card className="w-full">
										<CardBody>
											<div className="flex flex-row items-center justify-between gap-2 flex-nowrap">
												<p className="text-lg font-bold capitalize text-bluesky">{`${formatCurrency(selectedPromo?.promo_discount_price)}`}</p>
												<p className="font-bold capitalize text-tiny">Promo code</p>
											</div>
											<div className="flex flex-row items-center justify-between gap-2 flex-nowrap">
												<p className="font-bold text-tiny text-bluenavy">
													Spend at least
													<span className="text-orangejuice"> {formatCurrency(selectedPromo?.minimum_claim_price)} </span>
													to get this promo
												</p>
												<Snippet symbol="" variant="solid" color="primary">
													{selectedPromo?.promo_code}
												</Snippet>
											</div>
										</CardBody>
									</Card>
									<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
										<h3 className="w-2/5 font-semibold capitalize">Description</h3>
										<p className="w-3/5 text-base text-justify">{selectedPromo?.description}</p>
									</div>
									<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
										<h3 className="w-2/5 font-semibold capitalize">Terms and Conditions</h3>
										<p className="w-3/5 text-base text-justify">{selectedPromo?.terms_condition}</p>
									</div>
								</div>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ViewModal;
