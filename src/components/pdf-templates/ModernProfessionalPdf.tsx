import { Document, Page, View, Text, StyleSheet, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  header: { backgroundColor: colors.primary, paddingHorizontal: 40, paddingVertical: 28 },
  headerName: { fontSize: 26, fontWeight: "bold", color: colors.white, marginBottom: 4 },
  headerTitle: { fontSize: 14, color: "#ffffffcc" },
  body: { flexDirection: "row", paddingHorizontal: 40, paddingTop: 20 },
  leftCol: { width: "33%", paddingRight: 20 },
  rightCol: { width: "67%" },
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark, marginBottom: 8, paddingBottom: 4, borderBottomWidth: 2, borderBottomColor: colors.primary },
  contactItem: { flexDirection: "row", marginBottom: 6, fontSize: 9, color: colors.darkGray },
  contactLabel: { fontWeight: "bold", marginRight: 4, color: colors.primary, fontSize: 8 },
  skillTag: { backgroundColor: colors.bgLight, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 3, fontSize: 8, marginRight: 4, marginBottom: 4 },
  expBlock: { marginBottom: 12 },
  expTitle: { fontSize: 11, fontWeight: "bold", color: colors.dark },
  expCompany: { fontSize: 10, fontWeight: "bold", color: colors.primary, marginTop: 1 },
  expDate: { fontSize: 8, color: colors.gray },
  bullet: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 2, paddingLeft: 8 },
  summary: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 6 },
  section: { marginBottom: 16 },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: colors.darkGray },
  eduInst: { fontSize: 9, color: colors.gray, marginTop: 1 },
  eduDate: { fontSize: 8, color: colors.lightGray },
});

const ModernProfessionalPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.header} fixed={false}>
          <Text style={s.headerName}>{d.personalInfo.name}</Text>
          <Text style={s.headerTitle}>{d.personalInfo.title}</Text>
        </View>

        <View style={s.body}>
          {/* Left Column */}
          <View style={s.leftCol}>
            {/* Contact */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Contact</Text>
              {d.personalInfo.email && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>✉</Text>
                  <Text>{d.personalInfo.email}</Text>
                </View>
              )}
              {d.personalInfo.phone && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>☎</Text>
                  <Text>{d.personalInfo.phone}</Text>
                </View>
              )}
              {d.personalInfo.location && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>📍</Text>
                  <Text>{d.personalInfo.location}</Text>
                </View>
              )}
              {d.personalInfo.linkedin && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>in</Text>
                  <Text>{d.personalInfo.linkedin}</Text>
                </View>
              )}
              {d.personalInfo.website && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>🌐</Text>
                  <Text>{d.personalInfo.website}</Text>
                </View>
              )}
            </View>

            {/* Skills */}
            {d.skills.length > 0 && (
              <View style={s.section}>
                <Text style={s.sectionTitle}>Skills</Text>
                {d.skills.map((cat, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 9, fontWeight: "bold", color: colors.darkGray, marginBottom: 4 }}>{cat.category}</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {cat.skills.filter(sk => sk.trim()).map((skill, idx) => (
                        <Text key={idx} style={s.skillTag}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {d.education.length > 0 && d.education[0].institution && (
              <View style={s.section} wrap={false}>
                <Text style={s.sectionTitle}>Education</Text>
                {d.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 6 }}>
                    <Text style={s.eduDegree}>{edu.degree} {edu.field}</Text>
                    <Text style={s.eduInst}>{edu.institution}</Text>
                    <Text style={s.eduDate}>{edu.startDate} - {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={s.rightCol}>
            {/* Summary */}
            {d.summary && (
              <View style={s.section} wrap={false}>
                <Text style={s.sectionTitle}>Professional Summary</Text>
                <Text style={s.summary}>{d.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {d.experience.length > 0 && d.experience[0].position && (
              <View style={s.section}>
                <Text style={s.sectionTitle}>Work Experience</Text>
                {d.experience.map((exp) => (
                  <View key={exp.id} style={s.expBlock} wrap={false} minPresenceAhead={40}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <View>
                        <Text style={s.expTitle}>{exp.position}</Text>
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
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ModernProfessionalPdf;
