type ProgramCardProps = {
  title: string;
  img?: string;
  description: string;
  actors: string;
};

function ProgramCard({ title, img, description, actors }: ProgramCardProps) {
  return (
    <div className="program-card">
      <div className="program-image">
        <img className="img" src={img} alt={title} />
      </div>
      <div className="program-title">{title}</div>
      <div className="program-description">{description}</div>
      <div className="program-actors">{actors}</div>
    </div>
  );
}

export default ProgramCard;
