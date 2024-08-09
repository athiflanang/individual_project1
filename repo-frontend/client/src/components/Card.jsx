import { useNavigate } from "react-router-dom";

export default function Card({ data }) {
  const navigate = useNavigate();

  async function handleId(id) {
    navigate(`detail/${id}`);
  }

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-md transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-100 transition ease-in-out duration-300">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="monster"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data?.name}</h2>
          <p>{data?.description}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-outline btn-info"
              onClick={() => handleId(data?.id)}
            >
              read more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
