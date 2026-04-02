import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  header: { backgroundColor: colors.primary, paddingHorizontal: 40, paddingVertical: 28 },
  headerName: { fontSize: 26, fontWeight: "bold", color: colors.white, marginBottom: 4 },
  headerTitle: { fontSize: 14, color: colors.primaryLight },
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
        <View style={s.header} wrap={false}>
          <Text style={s.headerName}>{d.personalInfo.name}</Text>
          <Text style={s.headerTitle}>{d.personalInfo.title}</Text>
        </View>

        <View style={s.body}>
          {/* Left Column */}
          <View style={s.leftCol}>
            {/* Contact */}
            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={48}>Contact</Text>
              {d.personalInfo.email && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>Email</Text>
                  <Text>{d.personalInfo.email}</Text>
                </View>
              )}
              {d.personalInfo.phone && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>Phone</Text>
                  <Text>{d.personalInfo.phone}</Text>
                </View>
              )}
              {d.personalInfo.location && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>Location</Text>
                  <Text>{d.personalInfo.location}</Text>
                </View>
              )}
              {d.personalInfo.linkedin && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>LinkedIn</Text>
                  <Text>{d.personalInfo.linkedin}</Text>
                </View>
              )}
              {d.personalInfo.website && (
                <View style={s.contactItem}>
                  <Text style={s.contactLabel}>Web</Text>
                  <Text>{d.personalInfo.website}</Text>
                </View>
              )}
            </View>

            {/* Skills */}
            {d.skills.length > 0 && (
              <View style={s.section}>
                <Text style={s.sectionTitle} minPresenceAhead={48}>Skills</Text>
                {d.skills.map((cat, i) => (
                  <View key={i} style={{ marginBottom: 8 }} wrap={false}>
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
              <View style={s.section}>
                <Text style={s.sectionTitle} minPresenceAhead={48}>Education</Text>
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

          {/* Right Column */}
          <View style={s.rightCol}>
            {/* Summary */}
            {d.summary && (
              <View style={s.section}>
                <Text style={s.sectionTitle} minPresenceAhead={48}>Professional Summary</Text>
                <Text style={s.summary}>{d.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {d.experience.length > 0 && d.experience[0].position && (
              <View style={s.section}>
                <Text style={s.sectionTitle} minPresenceAhead={48}>Work Experience</Text>
                {d.experience.map((exp) => (
                  <View key={exp.id} style={s.expBlock} wrap={false}>
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
