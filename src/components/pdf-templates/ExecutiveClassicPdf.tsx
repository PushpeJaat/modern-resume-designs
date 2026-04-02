import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 35, paddingBottom: 30, paddingHorizontal: 45, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  header: { textAlign: "center", marginBottom: 20, paddingBottom: 16, borderBottomWidth: 2, borderBottomColor: colors.borderGray },
  name: { fontSize: 30, fontWeight: "bold", color: colors.dark, letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 14, color: colors.gray, marginBottom: 10 },
  contactRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 16 },
  contactItem: { fontSize: 9, color: colors.darkGray },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: colors.dark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 },
  summary: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 16 },
  expBlock: { marginBottom: 14 },
  expRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  expTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark },
  expCompany: { fontSize: 10, fontWeight: "bold", color: colors.resumeHeader, marginTop: 1 },
  expDate: { fontSize: 9, fontWeight: "bold", color: colors.darkGray },
  bullet: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 2 },
  section: { marginBottom: 16 },
  grid: { flexDirection: "row", gap: 30 },
  halfCol: { width: "50%" },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: colors.dark },
  eduInst: { fontSize: 9, fontWeight: "bold", color: colors.primary, marginTop: 1 },
  eduDate: { fontSize: 8, color: colors.lightGray, marginTop: 1 },
  skillLine: { fontSize: 9, color: colors.darkGray, marginBottom: 3 },
  skillLabel: { fontWeight: "bold" },
  achieveItem: { fontSize: 9, color: colors.darkGray, marginBottom: 3 },
});

const ExecutiveClassicPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.header} wrap={false}>
          <Text style={s.name}>{d.personalInfo.name}</Text>
          <Text style={s.title}>{d.personalInfo.title}</Text>
          <View style={s.contactRow}>
            {d.personalInfo.email && <Text style={s.contactItem}>{d.personalInfo.email}</Text>}
            {d.personalInfo.phone && <Text style={s.contactItem}>{d.personalInfo.phone}</Text>}
            {d.personalInfo.location && <Text style={s.contactItem}>{d.personalInfo.location}</Text>}
            {d.personalInfo.linkedin && <Text style={s.contactItem}>{d.personalInfo.linkedin}</Text>}
          </View>
        </View>

        {/* Summary */}
        {d.summary && (
          <View style={s.section}>
            <Text style={s.sectionTitle} minPresenceAhead={48}>Executive Summary</Text>
            <Text style={s.summary}>{d.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {d.experience.length > 0 && d.experience[0].position && (
          <View style={s.section}>
            <Text style={s.sectionTitle} minPresenceAhead={48}>Professional Experience</Text>
            {d.experience.map((exp) => (
              <View key={exp.id} style={s.expBlock} wrap={false}>
                <View style={s.expRow}>
                  <View>
                    <Text style={s.expTitle}>{exp.position}</Text>
                    <Text style={s.expCompany}>{exp.company}</Text>
                  </View>
                  <Text style={s.expDate}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                </View>
                {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                  <Text key={idx} style={s.bullet}>  {r}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education & Skills */}
        <View style={s.grid}>
          {d.education.length > 0 && d.education[0].institution && (
            <View style={s.halfCol}>
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

          {d.skills.length > 0 && (
            <View style={s.halfCol}>
              <Text style={s.sectionTitle} minPresenceAhead={48}>Key Skills</Text>
              {d.skills.map((cat, i) => (
                <Text key={i} style={s.skillLine}>
                  <Text style={s.skillLabel}>{cat.category}: </Text>
                  {cat.skills.filter(sk => sk.trim()).join(", ")}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Achievements */}
        {d.achievements && d.achievements.length > 0 && (
          <View style={{ ...s.section, marginTop: 16 }}>
            <Text style={s.sectionTitle} minPresenceAhead={48}>Awards & Recognition</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {d.achievements.map((a, i) => (
                <Text key={i} style={{ ...s.achieveItem, width: "50%" }} wrap={false}>- {a}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ExecutiveClassicPdf;
