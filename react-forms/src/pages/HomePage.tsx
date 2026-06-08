import { useEffect, useState } from "react";

import { Modal } from "../components/Modal/Modal";

import { ReactHookForm } from "../features/forms/RHFForm";
import { UncontrolledForm } from "../features/forms/UncontrolledForm";

import { useAppSelector } from "../app/hooks";
import { SubmissionCard } from "../components/SubmissionCard/SubmissionCard";

export function HomePage() {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const [rhfOpen, setRhfOpen] = useState(false);

 const submissions = useAppSelector(
  (state) => state.submissions.submissions,
);

const [highlightedId, setHighlightedId] = useState<string | null>(null);

useEffect(() => {
  if (submissions.length === 0) return;

  const last = submissions[0]; // ты используешь unshift → новые сверху

  setHighlightedId(last.id);

  const timer = setTimeout(() => {
    setHighlightedId(null);
  }, 2000);

  return () => clearTimeout(timer);
}, [submissions]);

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

      {submissions.length > 0 && (
  <section className="mt-8">
    <h2 className="mb-4 text-2xl font-bold">
      Submitted Forms
    </h2>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission) => (
        <SubmissionCard
          key={submission.id}
          name={submission.name}
          age={submission.age}
          email={submission.email}
          gender={submission.gender}
          country={submission.country}
          image={submission.image}
          highlighted={submission.id === highlightedId}
        />
      ))}
    </div>
  </section>
)}
    </main>
  );
}
