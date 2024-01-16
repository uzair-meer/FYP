import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/context/AuthContext.jsx";
import Button from "../Button/Button";

AddReview.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
  setBookings: PropTypes.func,
};

export default function AddReview({ data, setBookings, role }) {
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    comment: "",
    reply: "",
    isComment: false,
    isReply: false,
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  // Star component
  const Star = ({ filled, onClick }) => (
    <span
      className={`cursor-pointer ${
        filled ? "text-yellow-500" : "text-gray-400"
      }`}
      onClick={onClick}
    >
      ★
    </span>
  );

  // ... other functions ...

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          filled={i <= reviewFormData.rating}
          onClick={() => setReviewFormData({ ...reviewFormData, rating: i })}
        />
      );
    }
    return stars;
  };

  useEffect(() => {
    setReviewFormData({
      rating: data?.review?.rating || 0,
      comment: data?.review?.comment || "",
      reply: data?.review?.reply || "",
      isComment: !!data?.review?.comment,
      isReply: !!data?.review?.reply,
    });
  }, [data]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setReviewFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    //FIXME: handle error and success
    try {
      let url;
      let method;
      let body;
      if (role === "client") {
        url = "http://localhost:5000/client/review";
        method = "POST";
        body = {
          bookingId: data._id,
          rating: reviewFormData.rating,
          comment: reviewFormData.comment,
        };
      } else if (role === "company") {
        url = "http://localhost:5000/company/client-reviews";
        method = "PUT";
        body = { bookingId: data._id, reply: reviewFormData.reply };
      } else {
        //throw some error
        return new Error("app crash");
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(body),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok && result.status !== "ok")
        throw new Error("some error in review post api or on receiving side");

      setBookings((prevBookings) => {
        return prevBookings.map((booking) => {
          if (booking.data._id === data._id) {
            return {
              ...booking,
              data: {
                ...booking.data,
                review: result.data,
              },
            };
          }
          return booking;
        });
      });

      setReviewFormData({
        rating: result.data.rating,
        comment: result.data.comment,
        isComment: true,
        isReply: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //FIXME: break return statement into two parts one for company and one for client its becoming complex
  return (
    <form
      onSubmit={submitHandler}
      method="POST"
      className="rounded-xl flex w-full flex-col bg-[#FFEFEE] p-5"
    >
      {role === "client" && (
        <>
          {reviewFormData.isComment ? (
            <div>
              <p>
                <strong>Ratings: </strong>
                <div className="flex items-center space-x-1 my-2">
                  {renderStars()}
                </div>
              </p>
              <p>
                <strong>Comment: </strong>
                {reviewFormData.comment}
              </p>
              {reviewFormData.isReply && (
                <p>
                  <strong>Company Reply: </strong>
                  {reviewFormData.reply}
                </p>
              )}
            </div>
          ) : (
            <>
              <div>
                <strong>Ratings</strong>
                <input
                  value={reviewFormData.rating}
                  onChange={onChangeHandler}
                  type="number"
                  name="rating"
                  id="rating"
                  placeholder="rating"
                />
              </div>
              <textarea
                value={reviewFormData.comment}
                onChange={onChangeHandler}
                placeholder="Write a Review..."
                className="px-5 py-3 mt-5 rounded-xl"
                name="comment"
                id="comment"
                cols="30"
                rows="6"
              ></textarea>

              <Button className="mt-5 w-40 self-end" type="submit">
                Add Review
              </Button>
            </>
          )}
          <Button
            onClick={() =>
              navigate(`/${user.role}/booking/detail`, { state: data })
            }
            className="mt-5 mx-3 w-40"
          >
            Complete Detail
          </Button>
        </>
      )}

      {role === "company" && reviewFormData.isComment && (
        <div className="my-5 w-full">
          <h1 className="font-semibold">Rating {reviewFormData.rating}</h1>
          <p className="my-5">
            <strong>Client Review: </strong>
            {reviewFormData.comment}
          </p>

          {!reviewFormData.isReply && (
            <>
              <textarea
                value={reviewFormData.reply}
                onChange={onChangeHandler}
                placeholder="Write a Review..."
                className="w-full px-5 py-3 mt-5 rounded-xl"
                name="reply"
                id="reply"
                cols="30"
                rows="6"
              ></textarea>
              <Button className="mt-5 w-40 self-end" type="submit">
                Give Reply
              </Button>
            </>
          )}

          {reviewFormData.isReply && (
            <p>
              <strong>Our Reply: </strong> {reviewFormData.reply}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
