import { COMPANY } from "./company";

/**
 * Content for the contributor portal: projects, the questions each one asks,
 * and the consent wording contributors agree to.
 *
 * Adding a project means adding an entry to PROJECTS: its brief, its
 * questions, its spec and its terms. The pages render whatever is here.
 *
 * Consent wording follows docs/contributor-consent.md (Form A for the roster,
 * Form B per project) and is still a draft for legal review. The exact text of
 * every checkbox is stored with each consent record, so changing wording is
 * safe for past records, but it must come with a new `version`: contributors
 * are asked to agree again whenever the version changes.
 */

/**
 * Account-level consent, asked once at sign-up. It covers holding someone's
 * contact details, nothing project-specific: each project asks for its own
 * consent when someone applies.
 */
export const ROSTER_CONSENT = {
  form: "roster",
  version: "2.0",
  noticeTitle: "How we use your information",
  notice: [
    {
      heading: "What this account is for",
      body: `${COMPANY.name} runs paid data projects with contributors. Your account lets you apply to open projects and lets us contact you about them. Creating one is not an offer of work.`,
    },
    {
      heading: "What we collect and why",
      body: "Your name, WhatsApp number and location, so we can contact you and match you to projects. When you apply to a project we ask that project's own questions, and if you're accepted we ask for M-Pesa or bank details so we can pay you.",
    },
    {
      heading: "How long we keep it",
      body: "Two years from the date you register or from our last contact with you, whichever is later. You can ask us to delete it sooner at any time.",
    },
    {
      heading: "Who sees it",
      body: "Only us. We do not share your account details with clients and we never sell them. If a project involves sharing anything, its terms say what and with whom, and you agree to them separately.",
    },
    {
      heading: "Your rights",
      body: `You can ask for a copy of your information, correct it, delete it, or object to how we use it, by emailing ${COMPANY.email}. You can also complain to the Office of the Data Protection Commissioner in Kenya.`,
    },
  ],
  items: [
    {
      key: "roster",
      required: true,
      text: `${COMPANY.name} may hold the details on this form so I can apply to projects and be contacted about them.`,
    },
    {
      key: "new_projects",
      required: false,
      text: `${COMPANY.name} may message me on WhatsApp when new projects open.`,
    },
  ],
};

/**
 * Open projects. The first phase deliberately covers footage with no
 * identifiable people: it needs no release forms from anyone on camera and
 * keeps the footage outside the Data Protection Act while registration with
 * the ODPC is pending.
 */
/**
 * How and when contributors are paid, the same for every project. Work counts
 * towards the month we accept it in review (not when the client accepts it),
 * and each month is paid by `payDay` of the following month. Amounts are in
 * USD; local payouts are converted at the rate named in `rateSource`.
 */
export const PAYMENT_TERMS = {
  currency: "USD",
  payDay: 15,
  rateSource: "Central Bank of Kenya mean rate on the day we pay",
  summary:
    "Paid monthly in US dollars. Everything we accept in a calendar month is paid by the 15th of the next month, by M-Pesa or bank transfer.",
  conversion:
    "M-Pesa and Kenyan bank payments are sent in KES, converted at the Central Bank of Kenya mean rate on the day we pay. Each payment shows the rate used. We cover the transfer fees.",
};

const SCENES_WITHOUT_PEOPLE = [
  "Animals",
  "Nature",
  "Cities and buildings",
  "Transportation",
  "Food and cooking",
];

export const PROJECTS = [
  {
    slug: "video-collection-1",
    title: "Video collection: scenes without people",
    kind: "Video collection",
    // Optional `location: "Kenya"` for projects limited to one place; shown
    // next to `kind` wherever the project is listed.
    open: true,
    summary:
      "Film original video on your own phone or camera in the categories below. Upload each batch to your Drive folder and log it here. Every clip is reviewed against the specification; you are paid for the minutes that pass.",
    categories: SCENES_WITHOUT_PEOPLE,
    needs: [
      "A phone or camera that records 1080p video",
      "Steady hands, or a simple stand",
      "Original footage you filmed yourself, with no people or music in it",
      "A Google account, to upload to your Drive folder",
    ],
    // Asked when someone applies; answers are stored on their application.
    questions: [
      {
        key: "categories",
        type: "multi",
        label: "Which of these can you film?",
        hint: "Choose at least one.",
        options: SCENES_WITHOUT_PEOPLE,
      },
      {
        key: "weekly_hours",
        type: "number",
        label: "Hours of footage you could film per week",
        hint: "A realistic estimate. It helps us plan; it is not a commitment.",
        optional: true,
      },
    ],
    // CONFIRM: set once the pilot has shown real cost per accepted hour.
    payment: `Paid per accepted hour of footage, in US dollars. Your rate is confirmed with you before you start recording. ${PAYMENT_TERMS.summary}`,
    spec: [
      ["Resolution", "1080p or higher, recorded natively. Do not upscale."],
      ["Frame rate", "24 fps or higher."],
      ["Clip length", "At least 1 minute per clip."],
      ["Audio", "Keep the original sound, in sync. 44.1 kHz or higher."],
      ["Start and end", "Hold a steady shot for at least 2 seconds at the start and end. No frozen frames."],
      ["Continuity", "One continuous take. No looped, slowed-down or edited footage."],
      ["Text and logos", "Avoid signs, captions and brand logos filling the frame. No added text, stickers, blurring or watermarks."],
      ["People", "No recognisable faces or voices, including yours. Avoid readable number plates and house numbers."],
      ["Music", "No music playing in the background: radios, speakers, phones."],
      ["Files", "Upload the original files from your camera roll. Do not send through WhatsApp: it compresses video and the clip will fail review."],
    ],
    consent: {
      version: "1.3",
      notice: [
        {
          heading: "What the project involves",
          body: "Filming original video of animals, nature, buildings and streets, transport, and food preparation, using your own phone or camera, and uploading the original files.",
        },
        {
          heading: "What is collected",
          body: "The video files you upload, and the details you log about each batch. Location data embedded in the files is removed before delivery.",
        },
        {
          heading: "What it is used for",
          body: "Licensing to a technology company as training and evaluation data for AI systems that understand video.",
        },
        {
          // CONFIRM with the reviewer: see question 4 in
          // docs/contributor-consent.md on undisclosed recipients.
          heading: "Who receives it and where it goes",
          body: "A technology company, which may be based in another country. Your name and contact details are not sent with the footage.",
        },
        {
          heading: "Payment",
          body: `Paid per accepted hour of footage, in US dollars, for footage that passes our review. ${PAYMENT_TERMS.summary} ${PAYMENT_TERMS.conversion} Your payment does not depend on the optional box below.`,
        },
        {
          heading: "Withdrawing",
          body: `You can withdraw at any time before your footage is delivered and we will leave it out of what we send. After delivery we cannot guarantee removal from the client's dataset. Withdrawing does not affect payment for footage already accepted. Questions: ${COMPANY.email}.`,
        },
      ],
      items: [
        {
          key: "participate",
          required: true,
          text: "I agree to take part in this project as described above.",
        },
        {
          key: "own_work",
          required: true,
          text: `I filmed all footage I submit myself, it has not been licensed exclusively to anyone else, and I assign ${COMPANY.legalName} all rights in it, including the right to license it to its clients for commercial use and for training AI systems.`,
        },
        {
          key: "no_people_or_music",
          required: true,
          text: "The footage I submit contains no recognisable person's face or voice, and no music, films, broadcasts or other content made by someone else.",
        },
        {
          key: "transfer",
          required: true,
          text: "I understand the footage may be delivered to a company in another country and that, once delivered, it may not be possible to remove it from their dataset.",
        },
        {
          key: "quality_sample",
          required: false,
          text: `${COMPANY.name} may keep a sample of my footage as a quality reference for future projects.`,
        },
      ],
    },
  },
];

export function findProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
