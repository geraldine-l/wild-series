import "./App.css";
import ProgramCard from "./components/programCard";
import ProgramForm from "./components/programForm";

type ProgramData = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function App() {
  const programCardProps = {
    title: "Title Serie",
    description: "Description",
    actors: "Actors",
  };

  const handleSubmit = (program: ProgramData) => {
    console.info(program);
  };

  return (
    <>
      <ProgramForm
        defaultValue={{
          title: "",
          synopsis: "",
          poster: "",
          country: "",
          year: new Date().getFullYear(),
          category_id: 1,
        }}
        onSubmit={handleSubmit}
      >
        <div>Form submit</div>
      </ProgramForm>
      <ProgramCard {...programCardProps} />
    </>
  );
}

export default App;
