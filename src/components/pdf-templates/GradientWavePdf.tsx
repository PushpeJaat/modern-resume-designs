import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 35, paddingBottom: 30, paddingHorizontal: 40, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  name: { fontSize: 32, fontWeight: "bold", color: colors.primary, marginBottom: 3 },
  title: { fontSize: 16, color: colors.gray, marginBottom: 10 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  contactPill: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderWidth: 1, borderColor: colors.borderGray, backgroundColor: colors.bgLight, fontSize: 9 },
  contactLabel: { color: colors.primary, fontWeight: "bold", marginRight: 5, fontSize: 8 },
  summaryBox: { padding: 14, backgroundColor: colors.bgLight, borderRadius: 8, borderWidth: 1, borderColor: colors.borderGray, marginBottom: 18 },
  summaryTitle: { fontSize: 13, fontWeight: "bold", color: colors.dark, marginBottom: 6 },
  summaryText: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray },
  body: { flexDirection: "row", gap: 20 },
  leftCol: { width: "33%" },
  rightCol: { width: "67%" },
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark, marginBottom: 8 },
  section: { marginBottom: 14 },
  skillBox: { padding: 10, backgroundColor: colors.bgLight, borderRadius: 6, borderWidth: 1, borderColor: colors.borderGray, marginBottom: 10 },
  skillCatName: { fontSize: 9, fontWeight: "bold", color: colors.dark, marginBottom: 4 },
  skillTag: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 3, fontSize: 8, marginRight: 4, marginBottom: 4 },
  expCard: { padding: 12, backgroundColor: colors.bgLight, borderRadius: 6, borderLeftWidth: 3, marginBottom: 10 },
  expTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark },
  expCompany: { fontSize: 10, fontWeight: "bold", color: colors.primary, marginTop: 1 },
  expDate: { fontSize: 8, color: colors.gray, backgroundColor: colors.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  bullet: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 2 },
  certTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark, marginBottom: 6 },
  certItem: { fontSize: 9, fontWeight: "bold", color: colors.darkGray, marginBottom: 3 },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: colors.darkGray },
  eduInst: { fontSize: 9, color: colors.primary, fontWeight: "bold", marginTop: 1 },
  eduDate: { fontSize: 8, color: colors.lightGray },
});

const GradientWavePdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  const tagColors = [colors.primary, colors.accent, colors.dark];

  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View wrap={false}>
          <Text style={s.name}>{d.personalInfo.name}</Text>
          <Text style={s.title}>{d.personalInfo.title}</Text>
        </View>

        <View style={s.contactRow} wrap={false}>
          {d.personalInfo.email && <View style={s.contactPill}><Text style={s.contactLabel}>Email</Text><Text>{d.personalInfo.email}</Text></View>}
          {d.personalInfo.phone && <View style={s.contactPill}><Text style={s.contactLabel}>Phone</Text><Text>{d.personalInfo.phone}</Text></View>}
          {d.personalInfo.location && <View style={s.contactPill}><Text style={s.contactLabel}>Location</Text><Text>{d.personalInfo.location}</Text></View>}
        </View>

        {/* Summary */}
        {d.summary && (
          <View style={s.summaryBox} wrap={false}>
            <Text style={s.summaryTitle}>Professional Summary</Text>
            <Text style={s.summaryText}>{d.summary}</Text>
          </View>
        )}

        <View style={s.body}>
          {/* Left */}
          <View style={s.leftCol}>
            {d.skills.length > 0 && (
              <View style={s.section}>
                <Text style={s.sectionTitle} minPresenceAhead={48}>Technical Stack</Text>
                {d.skills.map((cat, i) => (
                  <View key={i} style={s.skillBox} wrap={false}>
                    <Text style={s.skillCatName}>{cat.category}</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {cat.skills.filter(sk => sk.trim()).map((skill, idx) => (
                        <Text key={idx} style={{ ...s.skillTag, backgroundColor: tagColors[i % tagColors.length], color: colors.white }}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {d.certifications && d.certifications.length > 0 && (
              <View style={s.section}>
                <Text style={s.certTitle} minPresenceAhead={48}>Certifications</Text>
                {d.certifications.map((cert, i) => (
                  <Text key={i} style={s.certItem} wrap={false}>- {cert}</Text>
                ))}
              </View>
            )}

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

          {/* Right */}
          <View style={s.rightCol}>
            {d.experience.length > 0 && d.experience[0].position && (
              <View style={s.section}>
                <Text style={{ ...s.sectionTitle, fontSize: 15 }} minPresenceAhead={48}>Experience</Text>
                {d.experience.map((exp, i) => (
                  <View key={exp.id} style={{ ...s.expCard, borderLeftColor: i % 2 === 0 ? colors.primary : colors.accent }} wrap={false}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
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

export default GradientWavePdf;
