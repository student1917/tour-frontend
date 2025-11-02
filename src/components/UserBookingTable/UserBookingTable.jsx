import React from "react";
import './user-booking-table.css';

export function UserBookingTable({ data, total, pagination, onPaginationChange }) {
  const { pageIndex, pageSize } = pagination;
  const totalPages = Math.ceil(total / pageSize);

  const handlePrev = () => {
    if (pageIndex > 1) onPaginationChange({ pageIndex: pageIndex - 1, pageSize });
  };

  const handleNext = () => {
    if (pageIndex < totalPages) onPaginationChange({ pageIndex: pageIndex + 1, pageSize });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "status-badge status-confirmed";
      case "pending":
        return "status-badge status-pending";
      case "cancelled":
      case "failed":
        return "status-badge status-cancelled";
      default:
        return "status-badge";
    }
  };

  return (
    <div className="user-booking-table">
      <div className="user-booking-table__scroll">
        <table className="user-booking-table__table">
          <thead className="user-booking-table__thead">
            <tr>
              <th>Tour</th>
              <th>Full Name</th>
              <th>Guests</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody className="user-booking-table__tbody">
            {data.length === 0 ? (
              <tr>
                <td colSpan="9" className="user-booking-table__empty">No bookings found</td>
              </tr>
            ) : (
              data.map((booking) => (
                <tr key={booking._id} className="user-booking-table__row">
                  <td>{booking.tourName}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.guestSize}</td>
                  <td>{booking.phone}</td>
                  <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                  <td><span className={getStatusClass(booking.status)}>{booking.status}</span></td>
                  <td>{booking.amount || "-"}</td>
                  <td>{booking.paymentMethod || "-"}</td>
                  <td>{booking.paymentStatus || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="user-booking-table__pagination">
        <span>Page {pageIndex} of {totalPages}</span>
        <div className="user-booking-table__pagination-buttons">
          <button onClick={handlePrev} disabled={pageIndex <= 1}>Prev</button>
          <button onClick={handleNext} disabled={pageIndex >= totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}
