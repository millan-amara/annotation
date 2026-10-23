# Contributor consent — Peskaya

**Status: draft for legal review. Not yet in use.**

Written against the Kenya Data Protection Act, 2019 and GDPR-style expectations, because
clients will be outside Kenya. A Kenyan data protection practitioner should review it
before it goes live — see *Notes for the reviewer* at the end for the specific questions
to put to them.

---

## The structural point, before the wording

There are **two separate consent events**, and collapsing them into one form is the most
common mistake:

| | **Form A — joining the roster** | **Form B — joining a project** |
|---|---|---|
| When | Someone registers interest | A specific project starts |
| Data | Name, contact, languages, country, availability, experience | Whatever the project collects: voice, face images, text, device data |
| Sensitivity | Ordinary personal data | Often **biometric** — sensitive personal data |
| Who is it shared with | Nobody | The client, named or described |
| Consent standard | Informed consent | **Explicit, specific consent** |

Form A cannot authorise Form B. A person agreeing to be on your roster has not agreed to
have their face recorded and sent to a company in another country. Each project needs its
own consent naming that project's purpose, recipient and retention.

Consent must also be **separable**: one tick per thing being agreed to, none pre-ticked,
and refusing an optional item must not block participation. Bundling everything into a
single "I agree to the terms" checkbox is the thing most likely to be judged invalid.

---

## Form A — Roster registration

> ### About this registration
>
> Peskaya recruits and manages teams for data collection and annotation projects.
> Registering puts you on our roster so we can contact you when a project matches your
> languages and location. **It is not an application to a project running today, and it is
> not an offer of work.**
>
> We are the data controller for the information on this form. You can reach us at
> contact@peskaya.com about anything on this page.
>
> ### What we collect and why
>
> Your name, contact details, country, languages and relevant experience — so we can tell
> whether you fit a project when one comes in, and contact you if you do.
>
> ### How long we keep it
>
> Two years from the date you register, or from our last contact with you, whichever is
> later. After that we delete it unless you have registered again. You can ask us to delete
> it sooner at any time.
>
> ### Who sees it
>
> Only us. We do not share roster information with clients or anyone else, and we never
> sell it. If you join a project, we will tell you at that point what is shared and with
> whom, and ask you separately.
>
> ### Your rights
>
> You can ask us for a copy of your information, correct it, delete it, or object to how we
> use it — email contact@peskaya.com. You can also complain to the Office of the
> Data Protection Commissioner in Kenya.
>
> ### Please confirm
>
> ☐ **(required)** I have read the above and agree that Peskaya may hold the
> information on this form to consider me for future projects.
>
> ☐ *(optional)* Peskaya may contact me about projects that do not match the languages
> I listed, if something else suitable comes up.
>
> *You can withdraw either of these at any time by emailing contact@peskaya.com.
> Withdrawing does not affect anything done before you withdrew, and will not count against
> you if you register again later.*

---

## Form B — Project participation

Fill the bracketed fields per project. Do not reuse a previous project's form.

> ### [Project name] — consent to take part
>
> **What the project involves:** [plain description of the task — e.g. "recording yourself
> reading 300 short sentences in Swahili using your own phone"]
>
> **What is collected:** [e.g. "audio recordings of your voice, and the text you read"]
>
> **What it is used for:** [e.g. "training and testing speech recognition software"]
>
> **Who receives it:** [name the client if permitted; otherwise "a technology company
> outside Kenya, whose identity we are contractually unable to disclose" — and see the
> reviewer note on whether that is sufficient]
>
> **Where it goes:** Your data will be transferred outside Kenya to [country/region]. We
> transfer it under [safeguard — e.g. standard contractual clauses in our agreement with
> the client].
>
> **How long it is kept:** [retention, e.g. "by the client indefinitely as part of their
> dataset; by Peskaya for 90 days after delivery, then deleted"]
>
> **Payment:** [rate and terms]. Your payment does not depend on which optional boxes you
> tick below.
>
> ### Please confirm — each box separately
>
> ☐ **(required)** I agree to take part in this project as described above.
>
> ☐ **(required)** I give my explicit consent for **[recordings of my voice / images of my
> face / other biometric data]** to be collected and used for the purpose described above.
> I understand this is sensitive personal data.
>
> ☐ **(required)** I understand and agree that my data will be transferred outside Kenya to
> [country/region] as described above.
>
> ☐ **(required)** I understand that once my data has been delivered to the client and
> combined into their dataset, Peskaya may no longer be able to retrieve or delete it,
> and that I should raise any later request with Peskaya so we can pass it on.
>
> ☐ *(optional)* Peskaya may keep a sample of my work as a quality reference for future
> projects.
>
> ### Withdrawing
>
> You can withdraw your consent at any time before delivery by emailing
> contact@peskaya.com, and we will remove your contributions from what we send.
> After delivery we will pass your request to the client and support them in acting on it,
> but we cannot guarantee removal from a dataset already in their hands. Withdrawing does
> not affect payment for work you have already completed and submitted.
>
> **Name:** ______________________  **Date:** ____________
>
> *Consent form version [x.y], [date].*

---

## Recording consent

Keep, for every contributor and every project: who consented, to exactly which items, the
form version and wording they saw, and the timestamp. If a regulator or a client asks you
to evidence consent, "they ticked a box" is not an answer — you need to show *what* they
ticked and *what it said at the time*.

Version the wording. Never edit a live form in place; publish a new version and keep the
old one.

---

## Implementation notes

- **One checkbox per consent.** In Google Forms that means separate required questions, not
  one question with several options.
- **Nothing pre-ticked.** Consent has to be an action.
- **Optional means optional.** If ticking it is effectively required to get work, it is not
  freely given and it will not stand up.
- **Plain language, and the contributor's language.** Consent has to be understood to be
  informed. Swahili versions of both forms are worth the cost.
- **Don't collect what the project doesn't need.** Every extra field is something you must
  secure, justify and delete later. ID documents in particular should be collected at
  contracting, not at registration.

---

## Notes for the reviewer

Specific questions worth putting to a Kenyan data protection practitioner:

1. **Registration.** Does Peskaya's activity fall under the mandatory registration
   schedule in the Data Protection (Registration of Data Controllers and Data Processors)
   Regulations, 2021 regardless of turnover and headcount — given that (a) data processing
   is the service sold, and (b) biometric data is processed? Does registration need to
   cover both controller and processor roles?
2. **DPIA.** Does collection of facial images and voice recordings for AI training require
   a Data Protection Impact Assessment before the next project begins?
3. **DPO.** Does the scale and sensitivity of this processing trigger the Data Protection
   Officer requirement?
4. **Undisclosed recipient.** Where an NDA prevents naming the client, is "a technology
   company outside Kenya" sufficient for informed consent, or must the recipient be named?
   This is the weakest point in Form B and it needs a direct answer.
5. **Cross-border transfers.** What must be in the client DPA to satisfy the Act's transfer
   conditions for sensitive data, and does any category here trigger localisation
   requirements?
6. **Minors.** Is an age gate needed on registration, and what is the position if a
   contributor turns out to be under 18?
7. **Withdrawal after delivery.** Is the wording above an acceptable description of the
   limits of withdrawal, or does the Act require a stronger commitment?
