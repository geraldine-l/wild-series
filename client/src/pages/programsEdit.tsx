import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProgramForm from "../components/programForm";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
}

function ProgramEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null as null | Program);
  const [program_id, setProgramId] = useState(null as null | number);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
        setProgramId(data.id);
      });
  }, [id]);

  return (
    program && (
      <ProgramForm
        defaultValue={program}
        onSubmit={async (programData) => {
          fetch(
            `${import.meta.env.VITE_API_URL}/api/categories/${program_id}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(programData),
            },
          ).then((response) => {
            if (response.status === 204) {
              navigate(`/categories/${program_id}`);
            }
          });
        }}
      >
        Modifier
      </ProgramForm>
    )
  );
}

export default ProgramEdit;
