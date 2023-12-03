import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();

  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  // WEIRD NOTE:
  if (isLoading) return <Spinner />;
  // Need to place the destructuring of the booking AFTER the 'if' checks above
  // Otherwise it tries to destructure it before the object actually exists, which throws an error.
  // Actualy I don't know if that's why, but that's my best guess. All I know is that ordering it in this fashion works.

  if (!booking) return <Empty resourceName={"booking"} />;
  // Add this^
  // prevents an error boundary throw.
  // meaning, if the person tries to go to a booking page that doesn't exist, it'll show this component
  // instead of the error boundary component that we set up in main.jsx

  const { status, id: bookingId } = booking;
  // Notice how ^
  // we're doing the destructuring of the booking AFTER the isLoading check

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check Out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
