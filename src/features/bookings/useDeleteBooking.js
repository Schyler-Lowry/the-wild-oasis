import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),

    onSuccess: () => {
      toast.success("Booking deleted successfully.");
      queryClient.invalidateQueries(["bookings"]);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeletingBooking, deleteBooking };
}
