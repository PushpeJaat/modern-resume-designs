import { Document, Page, View, Text, StyleSheet, Image, Circle, Svg, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Template-specific colors matching the preview exactly
const c = {
  headerDark: "#1a4d80",   // hsl(215,85%,35%)
  headerMid: "#1a6fc4",    // hsl(215,80%,45%)
  headerLight: "#2a9fd6",  // hsl(200,75%,50%)
  text: "#3d4f5f",         // hsl(215,15%,30%)
  heading: "#1a2a3a",      // hsl(215,20%,20%)
  subtext: "#7a8a9a",      // hsl(215,10%,55%)
  lightText: "#99a7b5",    // hsl(215,10%,65%)
  border: "#d5dbe3",       // hsl(215,20%,88%)
  skillBg: "#e6f0fa",      // hsl(215,85%,95%)
  skillText: "#1a4d80",    // hsl(215,85%,35%)
  accent: "#1a6fc4",       // hsl(215,85%,45%)
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica", color: c.text },
  // Header
  header: { backgroundColor: c.headerDark, paddingHorizontal: 40, paddingVertical: 24, flexDirection: "row", alignItems: "center", gap: 20 },
  photo: { width: 64, height: 64, borderRadius: 32, objectFit: "cover", borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" },
  photoPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.15)", borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" },
  headerInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: "bold", color: c.white, marginBottom: 2 },
  title: { fontSize: 12, color: "rgba(255,255,255,0.75)", marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: { fontSize: 8, color: "rgba(255,255,255,0.65)", flexDirection: "row", gap: 3 },
  contactIcon: { fontSize: 7, fontWeight: "bold", color: "rgba(255,255,255,0.5)" },
  // Body
  body: { paddingHorizontal: 40, paddingTop: 20 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", color: c.headerDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, flexDirection: "row", alignItems: "center", gap: 6 },
  sectionBar: { width: 24, height: 3, backgroundColor: c.accent, borderRadius: 2 },
  section: { marginBottom: 16 },
  summary: { fontSize: 9, lineHeight: 1.7, color: c.text },
  // Experience
  expBlock: { paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: c.border, marginBottom: 12 },
  expTitle: { fontSize: 11, fontWeight: "bold", color: c.heading },
  expCompany: { fontSize: 10, fontWeight: "bold", color: c.accent, marginTop: 1 },
  expDate: { fontSize: 8, color: c.subtext },
  bullet: { fontSize: 9, lineHeight: 1.6, color: c.text, marginBottom: 2, paddingLeft: 6 },
  // Skills
  grid: { flexDirection: "row", gap: 30 },
  halfCol: { width: "50%" },
  skillCat: { fontSize: 9, fontWeight: "bold", color: c.heading, marginBottom: 4 },
  skillWrap: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skillTag: { paddingHorizontal: 6, paddingVertical: 3, fontSize: 8, borderRadius: 10, backgroundColor: c.skillBg, color: c.skillText },
  // Education
  eduDegree: { fontSize: 10, fontWeight: "bold", color: c.heading },
  eduInst: { fontSize: 9, color: c.subtext, marginTop: 1 },
  eduDate: { fontSize: 8, color: c.lightText },
});

const SapphireBloomPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  const photo = d.personalInfo.photoUrl;

  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.header} fixed={false}>
          {photo ? (
            <Image src={photo} style={s.photo} />
          ) : (
            <View style={s.photoPlaceholder} />
          )}
          <View style={s.headerInfo}>
            <Text style={s.name}>{d.personalInfo.name}</Text>
            <Text style={s.title}>{d.personalInfo.title}</Text>
            <View style={s.contactRow}>
              {d.personalInfo.email && (
                <View style={s.contactItem}><Text style={s.contactIcon}>✉</Text><Text>{d.personalInfo.email}</Text></View>
              )}
              {d.personalInfo.phone && (
                <View style={s.contactItem}><Text style={s.contactIcon}>☎</Text><Text>{d.personalInfo.phone}</Text></View>
              )}
              {d.personalInfo.location && (
                <View style={s.contactItem}><Text style={s.contactIcon}>◉</Text><Text>{d.personalInfo.location}</Text></View>
              )}
              {d.personalInfo.linkedin && (
                <View style={s.contactItem}><Text style={s.contactIcon}>in</Text><Text>{d.personalInfo.linkedin}</Text></View>
              )}
              {d.personalInfo.website && (
                <View style={s.contactItem}><Text style={s.contactIcon}>◈</Text><Text>{d.personalInfo.website}</Text></View>
              )}
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={s.body}>
          {/* Summary */}
          {d.summary && (
            <View style={s.section}>
              <View style={s.sectionTitle}>
                <View style={s.sectionBar} />
                <Text>Professional Summary</Text>
              </View>
              <Text style={s.summary}>{d.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {d.experience.length > 0 && d.experience[0].position && (
            <View style={s.section}>
              <View style={s.sectionTitle}>
                <View style={s.sectionBar} />
                <Text>Work Experience</Text>
              </View>
              {d.experience.map((exp) => (
                <View key={exp.id} style={s.expBlock} wrap={false} minPresenceAhead={40}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                      <Text style={s.expTitle}>{exp.position}</Text>
                      <Text style={s.expCompany}>{exp.company}</Text>
                    </View>
                    <Text style={s.expDate}>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</Text>
                  </View>
                  {exp.responsibilities.filter((r) => r.trim()).map((r, idx) => (
                    <Text key={idx} style={s.bullet}>• {r}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Skills & Education */}
          <View style={s.grid}>
            {d.skills.length > 0 && (
              <View style={s.halfCol} wrap={false}>
                <View style={s.sectionTitle}>
                  <View style={s.sectionBar} />
                  <Text>Skills</Text>
                </View>
                {d.skills.map((cat, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={s.skillCat}>{cat.category}</Text>
                    <View style={s.skillWrap}>
                      {cat.skills.filter((sk) => sk.trim()).map((skill, idx) => (
                        <Text key={idx} style={s.skillTag}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {d.education.length > 0 && d.education[0].institution && (
              <View style={s.halfCol} wrap={false}>
                <View style={s.sectionTitle}>
                  <View style={s.sectionBar} />
                  <Text>Education</Text>
                </View>
                {d.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 6 }}>
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

export default SapphireBloomPdf;
