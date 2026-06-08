import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addSubmission } from "../submissions/submissionsSlice";
import { formSchema } from "../../schemas/formSchema";
import { fileToBase64 } from "../../utils/fileToBase64";

type FormValues = z.output<typeof formSchema>;
interface ReactHookFormProps {
  onClose: () => void;
}

export function ReactHookForm({
  onClose,
}: ReactHookFormProps) {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.countries);

  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      mode: "onChange",
    },
  );

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const file = data.image?.[0];

    let imageBase64 = "";

    if (file) {
      imageBase64 = await fileToBase64(file);
    }

    if (!countries.includes(data.country)) {
      setError("country", { message: "Country must be selected from list" });
      return;
    }

    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        type: "rhf",
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        country: data.country,
        image: imageBase64,
        createdAt: Date.now(),
      }),
    );

    reset();
    setPasswordValue("");
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl space-y-5
             max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} className={inputClass} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          className={inputClass}
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} className={inputClass} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label>Gender</label>
        <select {...register("gender")} className={inputClass}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label>Country</label>
        <input
          {...register("country")}
          list="countries"
          className={inputClass}
        />
        <datalist id="countries">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className={inputClass}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <p className={`text-sm mt-1 ${strengthColor}`}>
          Strength: {strengthLabel}
        </p>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className={inputClass}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label>Image</label>
        <input type="file" {...register("image")} className={inputClass} />
        {errors.image && (
          <p className="text-red-500">{errors.image.message as string}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("terms")} />
        <label>I accept Terms & Conditions</label>
      </div>

      {errors.terms && (
        <p className="text-red-500">{errors.terms.message as string}</p>
      )}

      <button
        disabled={!isValid}
        className={`w-full py-2 rounded-lg text-white transition ${
          isValid
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </form>
  );
}
