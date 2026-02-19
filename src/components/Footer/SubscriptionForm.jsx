import { useState } from "react";
import useToast from "../../hooks/useToast";
import Button from "../Button";
import TextInput from "../TextInput";

const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      toast.error(
        "Failed to subscribe. Please ensure your email is correct or try again later.",
      );
      return;
    }
    toast.success(
      "Subscription successful! Please check your email to confirm.",
    );
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
      <TextInput
        type="email"
        placeholder="Enter your email"
        required
        errorMessage={errorMessage}
        value={email}
        onChange={setEmail}
      />
      <Button
        type="submit"
        variant="primary"
        label="Subscribe"
        disabled={isSubmitting}
      >
        Subscribe
      </Button>
    </form>
  );
};

export default SubscriptionForm;
