export function Card({ image, code }) {
  return (
    <div className="card">
      <div className="card-inner">
        <img className="card-front" src={image} data-id={code}></img>
        <img className="card-back"></img>
      </div>
    </div>
  );
}
