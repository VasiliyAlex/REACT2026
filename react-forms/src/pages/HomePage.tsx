import { useState } from "react";

import { Modal } from "../components/Modal/Modal";

import { ReactHookForm } from "../features/forms/RHFForm";
import { UncontrolledForm } from "../features/forms/UncontrolledForm";

export function HomePage() {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const [rhfOpen, setRhfOpen] = useState(false);

  return (
    <main className="flex flex-col gap-4 p-8">
      <h1 className="mb-4 text-3xl font-bold">React Forms</h1>

      <button
        type="button"
        onClick={() => setUncontrolledOpen(true)}
        className="rounded border px-4 py-2"
      >
        Open Uncontrolled Form
      </button>

      <button
        type="button"
        onClick={() => setRhfOpen(true)}
        className="rounded border px-4 py-2"
      >
        Open RHF Form
      </button>

      <Modal
        isOpen={uncontrolledOpen}
        title="Uncontrolled Form"
        onClose={() => setUncontrolledOpen(false)}
      >
        <UncontrolledForm onClose={() => setUncontrolledOpen(false)} />
      </Modal>

      <Modal
        isOpen={rhfOpen}
        title="React Hook Form"
        onClose={() => setRhfOpen(false)}
      >
        <ReactHookForm onClose={() => setRhfOpen(false)} />
      </Modal>
    </main>
  );
}
