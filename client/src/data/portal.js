import { COMPANY } from "./company";

/**
 * Content for the contributor portal: categories, projects and the consent
 * wording contributors agree to.
 *
 * Consent wording follows docs/contributor-consent.md (Form A for the roster,
 * Form B per project) and is still a draft for legal review. The exact text of
 * every checkbox is stored with each consent record, so changing wording is
 * safe for past records, but it must come with a new `version`: contributors
 * are asked to agree again whenever the version changes.
 */

export const VIDEO_CATEGORIES = [
  "Human discussions",
  "Human action",
  "Human interacting with items",
  "Sports",
  "Music shows and performances",
  "Animals",
  "Nature",
  "Cities and buildings",
  "Transportation",
  "Industry",
  "Food and cooking",
  "Products and displays",
  "Animation (non-AI-generated)",
  "Video games (non-AI-generated)",
];

export const ROSTER_CONSENT = {
  form: "roster",
  version: "1.0",
  notice: [
    {
      heading: "About this registration",
      body: `${COMPANY.name} recruits and manages contributors for data collection projects. Registering puts you on our roster so we can contact you when a project matches your location and the categories you can film. It is not an offer of work.`,
    },
    {
      heading: "What we collect and why",
      body: "Your name, contact details, M-Pesa number, location, the categories you can film and your weekly availability: so we can match you to projects, contact you, and pay you.",
    },
    {
      heading: "How long we keep it",
      body: "Two years from the date you register or from our last contact with you, whichever is later. You can ask us to delete it sooner at any time.",
    },
    {
      heading: "Who sees it",
      body: "Only us. We do not share roster information with clients and we never sell it. If you join a project we tell you at that point what is shared and with whom, and ask you separately.",
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
      text: `I have read the above and agree that ${COMPANY.name} may hold the information on this form to consider me for future projects.`,
    },
    {
      key: "other_projects",
      required: false,
      text: `${COMPANY.name} may contact me about projects outside the categories I listed, if something else suitable comes up.`,
    },
  ],
};

/**
 * Open projects. The first phase deliberately covers footage with no
 * identifiable people: it needs no release forms from anyone on camera and
 * keeps the footage outside the Data Protection Act while registration with
 * the ODPC is pending.
 */
export const PROJECTS = [
  {
    slug: "video-collection-1",
    title: "Video collection: scenes without people",
    open: true,
    summary:
      "Film original video on your own phone or camera in the categories below. Upload each batch to your Drive folder and log it here. Every clip is reviewed against the specification; you are paid for the minutes that pass.",
    categories: [
      "Animals",
      "Nature",
      "Cities and buildings",
      "Transportation",
      "Food and cooking",
    ],
    // CONFIRM: set once the pilot has shown real cost per accepted hour.
    payment:
      "Paid per accepted hour of footage, by M-Pesa, after review. Your rate is confirmed with you before you start recording.",
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
      version: "1.0",
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
          body: "A technology company outside Kenya. Your name and contact details are not sent with the footage.",
        },
        {
          heading: "Payment",
          body: "Paid per accepted hour of footage, by M-Pesa, after review. Your payment does not depend on the optional box below.",
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
          text: "I understand the footage will be delivered to a company outside Kenya and that, once delivered, it may not be possible to remove it from their dataset.",
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
