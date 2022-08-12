import { useParams } from "react-router-dom";

export function EditProduct() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edição de produto</h1>
    </div>
  );
}
