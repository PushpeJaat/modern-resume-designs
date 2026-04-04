import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const c = {
  primary: "#2d7a5f",
  primaryLight: "#e6f5ee",
  accent: "#3a9e75",
  dark: "#1a3d2f",
  text: "#2a4038",
  gray: "#6b8a7d",
  border: "#c8ddd4",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica" },
  header: { backgroundColor: c.primary, padding: "40px 48px", flexDirection: "row", alignItems: "center", gap: 24 },
  photo: { width: 80, height: 80, borderRadius: 12, objectFit: "cover", border: `3px solid rgba(255,255,255,0.3)` },
  photoPlaceholder: { width: 80, height: 80, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)" },
  name: { fontSize: 22, fontWeight: "bold", color: c.white, marginBottom: 3 },
  title: { fontSize: 11, color: "rgba(255,255,255,0.8)" },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  contactItem: { fontSize: 8, color: "rgba(255,255,255,0.7)" },
  body: { padding: "24px 48px" },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: c.primary, marginBottom: 8, borderBottomWidth: 2, borderBottomColor: c.border, paddingBottom: 4 },
  summaryText: { fontSize: 9, lineHeight: 1.7, color: c.text },
  expItem: { marginBottom: 14, paddingLeft: 14, borderLeftWidth: 2, borderLeftColor: c.border },
  expPosition: { fontSize: 10, fontWeight: "bold", color: c.dark },
  expCompany: { fontSize: 9, color: c.accent },
  expDate: { fontSize: 8, color: c.gray },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  bullet: { fontSize: 9, lineHeight: 1.6, color: c.text, marginBottom: 2, paddingLeft: 8 },
  twoCols: { flexDirection: "row", gap: 24 },
  col: { flex: 1 },
  skillCatTitle: { fontSize: 9, fontWeight: "bold", color: c.dark, marginBottom: 4 },
  skillTag: { fontSize: 8, color: c.primary, backgroundColor: c.primaryLight, padding: "3px 8px", borderRadius: 10, marginRight: 4, marginBottom: 4 },
  skillTags: { flexDirection: "row", flexWrap: "wrap" },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: c.dark },
  eduInst: { fontSize: 8, color: c.gray, marginTop: 1 },
  eduDate: { fontSize: 8, color: c.gray },
});

const EmeraldElegancePdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.header} wrap={false}>
          {d.personalInfo.photoUrl ? (
            <Image src={d.personalInfo.photoUrl} style={s.photo} />
          ) : (
            <View style={s.photoPlaceholder} />
          )}
          <View>
            <Text style={s.name}>{d.personalInfo.name}</Text>
            <Text style={s.title}>{d.personalInfo.title}</Text>
            <View style={s.contactRow}>
              {d.personalInfo.email && <Text style={s.contactItem}>{d.personalInfo.email}</Text>}
              {d.personalInfo.phone && <Text style={s.contactItem}>{d.personalInfo.phone}</Text>}
              {d.personalInfo.location && <Text style={s.contactItem}>{d.personalInfo.location}</Text>}
              {d.personalInfo.linkedin && <Text style={s.contactItem}>{d.personalInfo.linkedin}</Text>}
              {d.personalInfo.website && <Text style={s.contactItem}>{d.personalInfo.website}</Text>}
            </View>
          </View>
        </View>

        <View style={s.body}>
          {d.summary && (
            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={48}>Professional Summary</Text>
              <Text style={s.summaryText}>{d.summary}</Text>
            </View>
          )}

          {d.experience.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={48}>Work Experience</Text>
              {d.experience.map((exp) => (
                <View key={exp.id} style={s.expItem} wrap={false}>
                  <View style={s.expHeader}>
                    <View>
                      <Text style={s.expPosition}>{exp.position}</Text>
                      <Text style={s.expCompany}>{exp.company}</Text>
                    </View>
                    <Text style={s.expDate}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                  </View>
                  {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                    <Text key={idx} style={s.bullet}>• {r}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          <View style={s.twoCols}>
            {d.skills.length > 0 && (
              <View style={s.col}>
                <Text style={s.sectionTitle} minPresenceAhead={48}>Skills</Text>
                {d.skills.map((cat, i) => (
                  <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                    <Text style={s.skillCatTitle}>{cat.category}</Text>
                    <View style={s.skillTags}>
                      {cat.skills.filter(sk => sk.trim()).map((sk, idx) => (
                        <Text key={idx} style={s.skillTag}>{sk}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {d.education.length > 0 && (
              <View style={s.col}>
                <Text style={s.sectionTitle} minPresenceAhead={48}>Education</Text>
                {d.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 8 }} wrap={false}>
                    <Text style={s.eduDegree}>{edu.degree} {edu.field}</Text>
                    <Text style={s.eduInst}>{edu.institution}</Text>
                    <Text style={s.eduDate}>{edu.startDate} - {edu.endDate}</Text>
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

export default EmeraldElegancePdf;
