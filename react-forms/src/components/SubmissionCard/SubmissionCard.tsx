interface SubmissionCardProps {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  image?: string;
  highlighted?: boolean;
}

export function SubmissionCard({
  name,
  age,
  email,
  gender,
  country,
  image,
  highlighted,
}: SubmissionCardProps) {
  return (
    <div
  className={`rounded border p-4 transition-all duration-500 ${
    highlighted
      ? "border-green-500 bg-green-50 shadow-lg"
      : "border-gray-200"
  }`}
>
      {image && (
        <img
          src={image}
          alt={name}
          className="mb-3 h-32 w-32 rounded object-cover"
        />
      )}

      <h3 className="text-lg font-bold">{name}</h3>

      <div className="mt-2 space-y-1 text-sm">
        <p>Age: {age}</p>
        <p>Email: {email}</p>
        <p>Gender: {gender}</p>
        <p>Country: {country}</p>
      </div>
    </div>
  );
}