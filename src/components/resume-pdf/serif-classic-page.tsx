import { Fragment } from "react";
import { Link, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeDraft } from "@/lib/resume-draft";
import {
  buildContactChunks,
  educationRows,
  experienceHasBody,
  formatDateRange,
  parseBulletLines,
  parseSkillTokens,
} from "@/lib/resume-pdf/shared-pdf";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontFamily: "Times-Roman",
    fontSize: 10,
    color: "#000000",
    lineHeight: 1.45,
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 22,
    color: "#000000",
    marginBottom: 6,
  },
  contactLine: {
    marginTop: 6,
    fontSize: 10,
    lineHeight: 1.5,
  },
  headerRule: {
    height: 1,
    backgroundColor: "#000000",
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionRule: {
    height: 1,
    backgroundColor: "#000000",
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },
  rowBetweenFirst: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
  },
  company: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    maxWidth: "70%",
  },
  dateBold: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    textAlign: "right",
    maxWidth: "30%",
  },
  titleItalic: {
    fontFamily: "Times-Italic",
    fontSize: 10,
    marginTop: 4,
    maxWidth: "70%",
  },
  bulletRow: { flexDirection: "row", marginTop: 4, paddingLeft: 4 },
  bullet: { width: 12, fontFamily: "Times-Roman", fontSize: 10 },
  bulletText: { flex: 1, fontFamily: "Times-Roman", fontSize: 10, lineHeight: 1.45 },
  expSpacer: { marginBottom: 14 },
  eduRowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  eduSchool: { fontFamily: "Times-Bold", fontSize: 10, maxWidth: "72%" },
  eduDate: { fontFamily: "Times-Bold", fontSize: 10, textAlign: "right" },
  eduDegree: { fontFamily: "Times-Italic", fontSize: 10, marginTop: 4 },
  skillsBlock: { marginTop: 4 },
  skillLabel: { fontFamily: "Times-Bold", fontSize: 10, marginBottom: 2 },
  skillLine: {
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.3,
    marginTop: 4,
    color: "#000000",
  },
  summaryText: {
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.22,
    color: "#000000",
  },
});

type Props = { draft: ResumeDraft };

export function SerifClassicPage({ draft }: Props) {
  const { contact, summary } = draft;
  const skills = parseSkillTokens(draft.skills);
  const experiences = draft.experiences.filter(experienceHasBody);
  const educations = educationRows(draft);
  const contactChunks = buildContactChunks(contact);

  return (
    <Page size="LETTER" style={styles.page}>
      <View wrap={false}>
        <Text style={styles.name}>
          {contact.fullName.trim() || "Your name"}
        </Text>
        {contactChunks.length > 0 ? (
          <Text style={styles.contactLine}>
            {contactChunks.map((chunk, i) => (
              <Fragment key={i}>
                {i > 0 ? <Text> | </Text> : null}
                {chunk.kind === "mailto" ? (
                  <Link
                    src={chunk.href}
                    style={{ color: "#1d4ed8", textDecoration: "underline" }}
                  >
                    {chunk.label}
                  </Link>
                ) : null}
                {chunk.kind === "link" ? (
                  <Link
                    src={chunk.href}
                    style={{ color: "#1d4ed8", textDecoration: "underline" }}
                  >
                    {chunk.label}
                  </Link>
                ) : null}
                {chunk.kind === "text" ? <Text>{chunk.label}</Text> : null}
              </Fragment>
            ))}
          </Text>
        ) : null}
        <View style={styles.headerRule} />
      </View>

      {summary.trim() ? (
        <View>
          <Text style={styles.sectionTitle}>Professional summary</Text>
          <View style={styles.sectionRule} />
          <Text style={styles.summaryText}>{summary.trim()}</Text>
        </View>
      ) : null}

      {experiences.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Work experience</Text>
          <View style={styles.sectionRule} />
          {experiences.map((exp, idx) => {
            const bullets = parseBulletLines(exp.bullets);
            const range = formatDateRange(
              exp.startDate,
              exp.endDate,
              exp.current,
            );
            const company = exp.company.trim() || "Company";
            const role = exp.role.trim() || "Title";
            const isLast = idx === experiences.length - 1;
            return (
              <View
                key={exp.id}
                style={isLast ? undefined : styles.expSpacer}
              >
                <View
                  style={idx === 0 ? styles.rowBetweenFirst : styles.rowBetween}
                >
                  <Text style={styles.company}>{company}</Text>
                  {range ? (
                    <Text style={styles.dateBold}>{range}</Text>
                  ) : null}
                </View>
                <Text style={styles.titleItalic}>{role}</Text>
                {bullets.map((line, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      ) : null}

      {educations.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.sectionRule} />
          {educations.map((edu) => (
            <View key={edu.id} style={{ marginBottom: 8 }}>
              <View style={styles.eduRowBetween}>
                <Text style={styles.eduSchool}>
                  {edu.school.trim() || "School"}
                </Text>
                {edu.year.trim() ? (
                  <Text style={styles.eduDate}>{edu.year.trim()}</Text>
                ) : null}
              </View>
              {edu.degree.trim() ? (
                <Text style={styles.eduDegree}>{edu.degree.trim()}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {skills.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>
            Skills & Interests
          </Text>
          <View style={styles.sectionRule} />
          <View style={styles.skillsBlock}>
            <Text style={styles.skillLabel}>Skills:</Text>
            <Text style={styles.skillLine}>
              {skills.join("  •  ")}
            </Text>
          </View>
        </View>
      ) : null}
    </Page>
  );
}
