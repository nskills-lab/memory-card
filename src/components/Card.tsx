import { DrawnCard } from './types';
export function Card({ code, image }: Pick<DrawnCard, 'code' | 'image'>) {
  return (
    <div className="card">
      <div className="card-inner">
        <img className="card-front" data-id={code} src={image}></img>
        <img className="card-back"></img>
      </div>
    </div>
  );
}
