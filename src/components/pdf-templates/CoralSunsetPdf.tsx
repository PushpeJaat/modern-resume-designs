import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const c = {
  primary: "#c05a2c",
  primaryLight: "#fef3ee",
  accent: "#d4893a",
  dark: "#3d2518",
  text: "#4a3228",
  gray: "#8a6e5e",
  border: "#e0cdc2",
  white: "#ffffff",
  headerStart: "#b54a2c",
  headerMid: "#c76a32",
  headerEnd: "#d4893a",
};

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica" },
  header: { backgroundColor: c.primary, padding: "40px 48px", flexDirection: "row", alignItems: "center", gap: 24 },
  photo: { width: 80, height: 80, borderRadius: 40, objectFit: "cover", border: `3px solid rgba(255,255,255,0.3)` },
  photoPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.2)" },
  name: { fontSize: 22, fontWeight: "bold", color: c.white, marginBottom: 3 },
  title: { fontSize: 11, color: "rgba(255,255,255,0.8)" },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  contactItem: { fontSize: 8, color: "rgba(255,255,255,0.7)" },
  body: { padding: "24px 48px" },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: c.primary, marginBottom: 8, flexDirection: "row", alignItems: "center", gap: 8 },
  sectionBar: { width: 32, height: 3, backgroundColor: c.accent, borderRadius: 2 },
  summaryText: { fontSize: 9, lineHeight: 1.5, color: c.text },
  expItem: { marginBottom: 14, paddingLeft: 14, borderLeftWidth: 2, borderLeftColor: c.border },
  expPosition: { fontSize: 10, fontWeight: "bold", color: c.dark },
  expCompany: { fontSize: 9, color: c.accent },
  expDate: { fontSize: 8, color: c.gray },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  bullet: { fontSize: 9, lineHeight: 1.4, color: c.text, marginBottom: 2, paddingLeft: 8 },
  twoCols: { flexDirection: "row", gap: 24 },
  col: { flex: 1 },
  skillCatTitle: { fontSize: 9, fontWeight: "bold", color: c.dark, marginBottom: 4 },
  skillTag: { fontSize: 8, color: c.primary, backgroundColor: c.primaryLight, padding: "3px 8px", borderRadius: 10, marginRight: 4, marginBottom: 4 },
  skillTags: { flexDirection: "row", flexWrap: "wrap" },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: c.dark },
  eduInst: { fontSize: 8, color: c.gray, marginTop: 1 },
  eduDate: { fontSize: 8, color: c.gray },
});

const CoralSunsetPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        <View style={s.header} wrap={false}>
          {d.personalInfo.photoUrl ? (
            <Image src={d.personalInfo.photoUrl} style={s.photo} />
          ) : (
            <View style={s.photoPlaceholder} />
          )}
          <View>
            <Text style={s.name}>{d.personalInfo.name || "Your Name"}</Text>
            <Text style={s.title}>{d.personalInfo.title || "Your Title"}</Text>
            <View style={s.contactRow}>
              {d.personalInfo.email && <Text style={s.contactItem}>{d.personalInfo.email}</Text>}
              {d.personalInfo.phone && <Text style={s.contactItem}>{d.personalInfo.phone}</Text>}
              {d.personalInfo.location && <Text style={s.contactItem}>{d.personalInfo.location}</Text>}
              {d.personalInfo.website && <Text style={s.contactItem}>{d.personalInfo.website}</Text>}
            </View>
          </View>
        </View>

        <View style={s.body}>
          {d.summary ? (
            <View style={s.section} minPresenceAhead={80}>
              <View style={s.sectionTitle}>
                <View style={s.sectionBar} />
                <Text>Professional Summary</Text>
              </View>
              <Text style={s.summaryText}>{d.summary}</Text>
            </View>
          ) : null}

          {d.experience.filter((e) => e.position).length > 0 && (
            <View style={s.section} minPresenceAhead={80}>
              <View style={s.sectionTitle}>
                <View style={s.sectionBar} />
                <Text>Work Experience</Text>
              </View>
              {d.experience
                .filter((e) => e.position)
                .map((exp, i) => (
                  <View key={i} style={s.expItem} minPresenceAhead={40}>
                    <View style={s.expHeader}>
                      <View>
                        <Text style={s.expPosition}>{exp.position}</Text>
                        <Text style={s.expCompany}>{exp.company}</Text>
                      </View>
                      <Text style={s.expDate}>
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                    {exp.responsibilities
                      .filter((r) => r.trim())
                      .slice(0, 6)
                      .map((r, j) => (
                        <Text key={j} style={s.bullet}>• {r}</Text>
                      ))}
                  </View>
                ))}
            </View>
          )}

          <View style={s.twoCols}>
            {d.skills.length > 0 && (
              <View style={s.col}>
                <View style={s.sectionTitle}>
                  <View style={s.sectionBar} />
                  <Text>Skills</Text>
                </View>
                {d.skills.map((cat, i) => (
                  <View key={i} style={{ marginBottom: 8 }} minPresenceAhead={40}>
                    <Text style={s.skillCatTitle}>{cat.category}</Text>
                    <View style={s.skillTags}>
                      {cat.skills
                        .filter((sk) => sk.trim())
                        .map((sk, j) => (
                          <Text key={j} style={s.skillTag}>{sk}</Text>
                        ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {d.education.filter((e) => e.institution).length > 0 && (
              <View style={s.col}>
                <View style={s.sectionTitle}>
                  <View style={s.sectionBar} />
                  <Text>Education</Text>
                </View>
                {d.education
                  .filter((e) => e.institution)
                  .map((edu, i) => (
                    <View key={i} style={{ marginBottom: 8 }} minPresenceAhead={40}>
                      <Text style={s.eduDegree}>{edu.degree} {edu.field}</Text>
                      <Text style={s.eduInst}>{edu.institution}</Text>
                      <Text style={s.eduDate}>{edu.startDate} — {edu.endDate}</Text>
                    </View>
                  ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CoralSunsetPdf;
