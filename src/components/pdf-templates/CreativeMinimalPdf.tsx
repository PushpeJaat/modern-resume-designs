import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 35, paddingBottom: 30, paddingHorizontal: 40, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  headerRow: { flexDirection: "row", marginBottom: 16 },
  accentBar: { width: 4, backgroundColor: colors.accent, borderRadius: 2, marginRight: 12 },
  name: { fontSize: 28, fontWeight: "bold", color: colors.dark, marginBottom: 3 },
  title: { fontSize: 16, color: colors.gray },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20, gap: 14 },
  contactItem: { flexDirection: "row", fontSize: 9, color: colors.darkGray },
  contactIcon: { color: colors.accent, fontWeight: "bold", marginRight: 4, fontSize: 8 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  sectionBar: { width: 30, height: 3, backgroundColor: colors.accent, borderRadius: 2, marginRight: 8 },
  sectionTitle: { fontSize: 15, fontWeight: "bold", color: colors.dark },
  summary: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 16 },
  expBlock: { paddingLeft: 14, borderLeftWidth: 2, borderLeftColor: colors.borderGray, marginBottom: 14 },
  expDot: { position: "absolute", left: -7, top: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  expTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark },
  expCompany: { fontSize: 10, fontWeight: "bold", color: colors.accent, marginTop: 1 },
  expDate: { fontSize: 8, color: colors.gray },
  bullet: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 2, paddingLeft: 6 },
  section: { marginBottom: 16 },
  grid: { flexDirection: "row", gap: 30 },
  halfCol: { width: "50%" },
  skillCat: { fontSize: 9, fontWeight: "bold", color: colors.dark, marginBottom: 3 },
  skillText: { fontSize: 9, color: colors.darkGray, lineHeight: 1.5 },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: colors.dark },
  eduInst: { fontSize: 9, color: colors.accent, fontWeight: "bold", marginTop: 1 },
  eduDate: { fontSize: 8, color: colors.lightGray },
});

const CreativeMinimalPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.headerRow} wrap={false}>
          <View style={s.accentBar} />
          <View>
            <Text style={s.name}>{d.personalInfo.name}</Text>
            <Text style={s.title}>{d.personalInfo.title}</Text>
          </View>
        </View>

        {/* Contact */}
        <View style={s.contactRow} wrap={false}>
          {d.personalInfo.email && <View style={s.contactItem}><Text style={s.contactIcon}>✉</Text><Text>{d.personalInfo.email}</Text></View>}
          {d.personalInfo.phone && <View style={s.contactItem}><Text style={s.contactIcon}>☎</Text><Text>{d.personalInfo.phone}</Text></View>}
          {d.personalInfo.location && <View style={s.contactItem}><Text style={s.contactIcon}>📍</Text><Text>{d.personalInfo.location}</Text></View>}
          {d.personalInfo.linkedin && <View style={s.contactItem}><Text style={s.contactIcon}>in</Text><Text>{d.personalInfo.linkedin}</Text></View>}
          {d.personalInfo.github && <View style={s.contactItem}><Text style={s.contactIcon}>⌨</Text><Text>{d.personalInfo.github}</Text></View>}
        </View>

        {/* Summary */}
        {d.summary && (
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <View style={s.sectionBar} />
              <Text style={s.sectionTitle}>About</Text>
            </View>
            <Text style={s.summary}>{d.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {d.experience.length > 0 && d.experience[0].position && (
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <View style={s.sectionBar} />
              <Text style={s.sectionTitle}>Experience</Text>
            </View>
            {d.experience.map((exp) => (
              <View key={exp.id} style={s.expBlock} wrap={false} minPresenceAhead={40}>
                <View style={s.expDot} />
                <Text style={s.expTitle}>{exp.position}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={s.expCompany}>{exp.company}</Text>
                  <Text style={s.expDate}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                </View>
                {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                  <Text key={idx} style={s.bullet}>• {r}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills & Education Grid */}
        <View style={s.grid}>
          {d.skills.length > 0 && (
            <View style={s.halfCol} wrap={false}>
              <View style={s.sectionHeader}>
                <View style={s.sectionBar} />
                <Text style={s.sectionTitle}>Skills</Text>
              </View>
              {d.skills.map((cat, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={s.skillCat}>{cat.category}</Text>
                  <Text style={s.skillText}>{cat.skills.filter(sk => sk.trim()).join(", ")}</Text>
                </View>
              ))}
            </View>
          )}

          {d.education.length > 0 && d.education[0].institution && (
            <View style={s.halfCol} wrap={false}>
              <View style={s.sectionHeader}>
                <View style={s.sectionBar} />
                <Text style={s.sectionTitle}>Education</Text>
              </View>
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
      </Page>
    </Document>
  );
};

export default CreativeMinimalPdf;
