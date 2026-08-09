import { z } from "zod";

/**
 * Shared Zod validation for the quote request. Used by the client form and the
 * server route handler so the contract is enforced in both places.
 */

const currentYear = new Date().getFullYear();
export const MIN_VEHICLE_YEAR = 1930;
export const MAX_VEHICLE_YEAR = currentYear + 1;
export const MAX_VEHICLES = 5;
export const MAX_NOTES = 1000;

// Reject control characters while keeping the value a ZodString so callers can
// still chain .min()/.email() etc.
const noControlChars = /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/;

const safeString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .regex(noControlChars, "Please remove unusual characters.");

export const vehicleSchema = z.object({
  year: z
    .number({ invalid_type_error: "Select a year." })
    .int()
    .min(MIN_VEHICLE_YEAR, "Enter a valid year.")
    .max(MAX_VEHICLE_YEAR, "Enter a valid year."),
  make: safeString(60).min(1, "Enter the vehicle make."),
  model: safeString(60).min(1, "Enter the vehicle model."),
  operable: z.boolean({ invalid_type_error: "Select operable status." }),
});

export const quoteSchema = z
  .object({
    // Honeypot: must be empty. Bots tend to fill every field.
    company: z.string().max(0).optional().or(z.literal("")),

    shipmentScope: z.enum(["domestic", "international"], {
      required_error: "Select a shipment scope.",
    }),
    pickupLocation: safeString(160).min(2, "Enter a pickup location."),
    deliveryLocation: safeString(160).min(2, "Enter a delivery location."),
    transportType: z.enum(["open", "enclosed", "unsure"], {
      required_error: "Select a transport type.",
    }),

    vehicles: z
      .array(vehicleSchema)
      .min(1, "Add at least one vehicle.")
      .max(MAX_VEHICLES, `You can add up to ${MAX_VEHICLES} vehicles.`),

    availability: z.enum(["asap", "specific-date"], {
      required_error: "Choose your pickup availability.",
    }),
    availableDate: z.string().trim().optional(),

    customer: z.object({
      fullName: safeString(120).min(2, "Enter your full name."),
      email: safeString(180).email("Enter a valid email address."),
      phone: safeString(40).min(7, "Enter a valid phone number."),
    }),

    notes: safeString(MAX_NOTES).optional().or(z.literal("")),

    consent: z.literal(true, {
      errorMap: () => ({ message: "Consent is required to continue." }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.availability === "specific-date") {
      const value = data.availableDate;
      if (!value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["availableDate"],
          message: "Choose a pickup date.",
        });
        return;
      }
      const chosen = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(chosen.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["availableDate"],
          message: "Choose a valid date.",
        });
      } else if (chosen < today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["availableDate"],
          message: "Choose a date that is not in the past.",
        });
      }
    }
  });

export type QuoteFormValues = z.infer<typeof quoteSchema>;

/** The server-side payload we treat as the canonical lead record. */
export type QuoteRequest = {
  shipmentScope: "domestic" | "international";
  pickupLocation: string;
  deliveryLocation: string;
  transportType: "open" | "enclosed" | "unsure";
  vehicles: Array<{
    year: number;
    make: string;
    model: string;
    operable: boolean;
  }>;
  availability: "asap" | "specific-date";
  availableDate?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  notes?: string;
  consent: true;
  submittedAt: string;
  source: "carex-auto-website";
};

/** Default empty form values used to initialize React Hook Form. */
export const emptyQuoteValues: QuoteFormValues = {
  company: "",
  shipmentScope: "domestic",
  pickupLocation: "",
  deliveryLocation: "",
  transportType: "open",
  vehicles: [{ year: MAX_VEHICLE_YEAR, make: "", model: "", operable: true }],
  availability: "asap",
  availableDate: "",
  customer: { fullName: "", email: "", phone: "" },
  notes: "",
  // Starts unchecked; user must actively consent. Typed loosely for RHF.
  consent: false as unknown as true,
};
