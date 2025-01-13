import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProgramDeleteForm from "../components/programDeleteForm";

type Program = {
  id: number;
  title: string;
};

type Category = {
  id: number;
  name: string;
  programs: Program[];
};

function ProgramsDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);
  const [category, setCategory] = useState(null as null | Category);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    program &&
    category && (
      <>
        <hgroup className="details-hgroup">
          <h1>{program.title}</h1>
          <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
          <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
        </hgroup>
        <ul>
          {category.programs.map((program) => (
            <li key={program.id}>
              <Link to={`/programs/${program.id}`}>{program.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  );
}

export default ProgramsDetails;
