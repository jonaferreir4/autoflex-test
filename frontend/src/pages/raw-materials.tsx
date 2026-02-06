import { useEffect } from 'react';
import { Package } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMaterials, deleteMaterial } from '../store/materials-slice';
import { PageHeader } from '../components/page-header';
import { useRawMaterialForm } from '../hooks/use-raw-material-form';
import { RawMaterialForm } from '../components/raw-material-form';
import { RawMaterialList } from '../components/raw-material-list';

export function RawMaterials() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.materials);

  const {
    code, setCode,
    name, setName, 
    qty, setQty, 
    editingId, 
    startEditing, 
    cancelEditing, 
    handleSubmit 
  } = useRawMaterialForm();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchMaterials());
  }, [status, dispatch]);

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta matéria-prima?')) {
      await dispatch(deleteMaterial(id));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageHeader title="Matérias-Primas" icon={Package} />
      
      <RawMaterialForm
        code={code}
        setCode={setCode}
        name={name}
        setName={setName}
        qty={qty}
        setQty={setQty}
        editingId={editingId}
        onSubmit={handleSubmit}
        onCancel={cancelEditing}
      />

      <RawMaterialList 
        items={items}
        status={status}
        onEdit={startEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}