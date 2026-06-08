import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addSubmission } from "../submissions/submissionsSlice";
import { formSchema } from "../../schemas/formSchema";
import { fileToBase64 } from "../../utils/fileToBase64";
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from "../../utils/constants";

export function UncontrolledForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [passwordValue, setPasswordValue] = useState("");

  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.countries);

  const getStrength = (value: string) => {
    let score = 0;
    if (/[0-9]/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  };

  const strength = getStrength(passwordValue);

  const strengthColor =
    strength <= 1
      ? "text-red-500"
      : strength === 2
        ? "text-yellow-500"
        : "text-green-600";

  const strengthLabel =
    strength <= 1 ? "Weak" : strength === 2 ? "Medium" : "Strong";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const fileEntry = formData.get("image");
    let imageBase64 = "";

    if (fileEntry instanceof File && fileEntry.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(fileEntry.type)) {
        setErrors({ image: ["Only PNG or JPEG allowed"] });
        return;
      }

      if (fileEntry.size > MAX_IMAGE_SIZE) {
        setErrors({ image: ["Image must be less than 2MB"] });
        return;
      }

      imageBase64 = await fileToBase64(fileEntry);
    }

    if (!data.terms) {
      setErrors({ terms: ["You must accept Terms & Conditions"] });
      return;
    }

    const result = formSchema.safeParse({
      name: String(data.name || ""),
      age: Number(data.age),
      email: String(data.email || ""),
      gender: String(data.gender || ""),
      country: String(data.country || ""),
      password: String(data.password || ""),
      confirmPassword: String(data.confirmPassword || ""),
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    if (!countries.includes(String(data.country))) {
      setErrors({ country: ["Country must be selected from list"] });
      return;
    }

    setErrors({});

    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        type: "uncontrolled",
        name: String(data.name),
        age: Number(data.age),
        email: String(data.email),
        gender: String(data.gender),
        country: String(data.country),
        image: imageBase64,
        createdAt: Date.now(),
      }),
    );

    e.currentTarget.reset();
    setPasswordValue("");
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl space-y-5
             max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" className={inputClass} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="text-sm font-medium">
          Age
        </label>
        <input id="age" name="age" type="number" className={inputClass} />
        {errors.age && <p className="text-red-500 text-sm">{errors.age[0]}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input id="email" name="email" className={inputClass} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="gender" className="text-sm font-medium">
          Gender
        </label>
        <select id="gender" name="gender" className={inputClass}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="country" className="text-sm font-medium">
          Country
        </label>
        <input
          id="country"
          name="country"
          list="countries"
          className={inputClass}
        />
        <datalist id="countries">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={inputClass}
          onChange={(e) => setPasswordValue(e.target.value)}
        />

        <p className={`text-sm mt-1 ${strengthColor}`}>
          Strength: {strengthLabel}
        </p>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={inputClass}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="text-sm font-medium">
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/png,image/jpeg"
          className="w-full text-sm border border-gray-300 rounded-lg file:px-3 file:py-1 file:bg-blue-50"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image[0]}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input id="terms" name="terms" type="checkbox" />
        <label htmlFor="terms" className="text-sm">
          I accept Terms & Conditions
        </label>
      </div>

      {errors.terms && (
        <p className="text-red-500 text-sm">{errors.terms[0]}</p>
      )}

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Submit
      </button>
    </form>
  );
}
