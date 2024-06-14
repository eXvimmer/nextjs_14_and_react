"use client";

import { useFormState } from "react-dom";
import FormSubmit from "./form-submit";

export interface PostFormState {
  errors: string[];
}

export default function PostForm({
  action, // TODO: fix this
}: {
  action: (
    _prevState: PostFormState,
    formData: FormData,
  ) => Promise<PostFormState>;
}) {
  const [state, formAction] = useFormState(action, { errors: [] });

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
        {state.errors && (
          <ul className="form-errors">
            {state.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}
