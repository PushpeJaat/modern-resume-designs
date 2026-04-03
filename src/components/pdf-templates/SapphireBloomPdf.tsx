import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const c = {
  headerDark: "#1a4d80",
  headerMid: "#1a6fc4",
  text: "#3d4f5f",
  heading: "#1a2a3a",
  subtext: "#7a8a9a",
  lightText: "#99a7b5",
  border: "#d5dbe3",
  skillBg: "#e6f0fa",
  skillText: "#1a4d80",
  accent: "#1a6fc4",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica", color: c.text },
  header: { backgroundColor: c.headerDark, paddingHorizontal: 40, paddingVertical: 24, flexDirection: "row", alignItems: "center", gap: 20, position: "relative", overflow: "hidden" },
  // Gradient layers to simulate the gradient background
  headerGradientLayer1: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: c.headerDark },
  headerGradientLayer2: { position: "absolute", top: 0, left: "30%", right: 0, bottom: 0, backgroundColor: c.headerMid, opacity: 0.5 },
  headerGradientLayer3: { position: "absolute", top: 0, left: "60%", right: 0, bottom: 0, backgroundColor: "#2080d0", opacity: 0.35 },
  // Decorative circles
  circle1: { position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "rgba(255,255,255,0.12)" },
  circle2: { position: "absolute", bottom: -48, left: -48, width: 156, height: 156, borderRadius: 78, borderWidth: 2, borderColor: "rgba(255,255,255,0.10)" },
  circle3: { position: "absolute", top: 8, right: 84, width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  photo: { width: 64, height: 64, borderRadius: 32, objectFit: "cover", borderWidth: 2, borderColor: "#6699cc" },
  photoPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#2a5d90", borderWidth: 2, borderColor: "#6699cc" },
  headerInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: "bold", color: c.white, marginBottom: 2 },
  title: { fontSize: 12, color: "#aaccee", marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: { fontSize: 8, color: "#88aacc", flexDirection: "row", gap: 3 },
  contactLabel: { fontSize: 7, fontWeight: "bold", color: "#6699bb" },
  body: { paddingHorizontal: 40, paddingTop: 20 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  sectionBar: { width: 24, height: 3, backgroundColor: c.accent, borderRadius: 2 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", color: c.headerDark, textTransform: "uppercase", letterSpacing: 1.5 },
  section: { marginBottom: 16 },
  summary: { fontSize: 9, lineHeight: 1.7, color: c.text },
  expBlock: { paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: c.border, marginBottom: 12 },
  expTitle: { fontSize: 11, fontWeight: "bold", color: c.heading },
  expCompany: { fontSize: 10, fontWeight: "bold", color: c.accent, marginTop: 1 },
  expDate: { fontSize: 8, color: c.subtext },
  bullet: { fontSize: 9, lineHeight: 1.6, color: c.text, marginBottom: 2, paddingLeft: 6 },
  grid: { flexDirection: "row", gap: 30 },
  halfCol: { width: "50%" },
  skillCat: { fontSize: 9, fontWeight: "bold", color: c.heading, marginBottom: 4 },
  skillWrap: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skillTag: { paddingHorizontal: 6, paddingVertical: 3, fontSize: 8, borderRadius: 10, backgroundColor: c.skillBg, color: c.skillText },
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
        <View style={s.header} wrap={false}>
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
                <View style={s.contactItem}><Text style={s.contactLabel}>Email:</Text><Text>{d.personalInfo.email}</Text></View>
              )}
              {d.personalInfo.phone && (
                <View style={s.contactItem}><Text style={s.contactLabel}>Phone:</Text><Text>{d.personalInfo.phone}</Text></View>
              )}
              {d.personalInfo.location && (
                <View style={s.contactItem}><Text style={s.contactLabel}>Location:</Text><Text>{d.personalInfo.location}</Text></View>
              )}
              {d.personalInfo.linkedin && (
                <View style={s.contactItem}><Text style={s.contactLabel}>LinkedIn:</Text><Text>{d.personalInfo.linkedin}</Text></View>
              )}
              {d.personalInfo.website && (
                <View style={s.contactItem}><Text style={s.contactLabel}>Web:</Text><Text>{d.personalInfo.website}</Text></View>
              )}
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={s.body}>
          {/* Summary */}
          {d.summary && (
            <View style={s.section}>
              <View style={s.sectionTitleRow}>
                <View style={s.sectionBar} />
                <Text style={s.sectionTitle}>Professional Summary</Text>
              </View>
              <Text style={s.summary}>{d.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {d.experience.length > 0 && d.experience[0].position && (
            <View style={s.section}>
              <View style={s.sectionTitleRow} minPresenceAhead={48}>
                <View style={s.sectionBar} />
                <Text style={s.sectionTitle}>Work Experience</Text>
              </View>
              {d.experience.map((exp) => (
                <View key={exp.id} style={s.expBlock} wrap={false}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                      <Text style={s.expTitle}>{exp.position}</Text>
                      <Text style={s.expCompany}>{exp.company}</Text>
                    </View>
                    <Text style={s.expDate}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
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
              <View style={s.halfCol}>
                <View style={s.sectionTitleRow} minPresenceAhead={48}>
                  <View style={s.sectionBar} />
                  <Text style={s.sectionTitle}>Skills</Text>
                </View>
                {d.skills.map((cat, i) => (
                  <View key={i} style={{ marginBottom: 8 }} wrap={false}>
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
              <View style={s.halfCol}>
                <View style={s.sectionTitleRow} minPresenceAhead={48}>
                  <View style={s.sectionBar} />
                  <Text style={s.sectionTitle}>Education</Text>
                </View>
                {d.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 6 }} wrap={false}>
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

export default SapphireBloomPdf;
