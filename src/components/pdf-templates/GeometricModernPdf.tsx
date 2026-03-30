import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 30, paddingBottom: 30, paddingHorizontal: 40, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  headerBar: { position: "absolute", left: 0, top: 0, width: 3, height: 80, backgroundColor: colors.primary },
  name: { fontSize: 28, fontWeight: "bold", color: colors.dark, marginBottom: 3 },
  title: { fontSize: 16, color: colors.gray, marginBottom: 12 },
  contactGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  contactBox: { flexDirection: "row", alignItems: "center", gap: 6, fontSize: 9 },
  contactIconBox: { width: 22, height: 22, borderRadius: 3, backgroundColor: colors.primaryLight, justifyContent: "center", alignItems: "center" },
  contactIcon: { fontSize: 9, color: colors.primary, fontWeight: "bold" },
  body: { flexDirection: "row", gap: 20 },
  leftCol: { width: "33%" },
  rightCol: { width: "67%" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  sectionBar: { width: 20, height: 3, backgroundColor: colors.primary },
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark },
  summary: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 4 },
  section: { marginBottom: 14 },
  skillName: { fontSize: 9, color: colors.darkGray, marginBottom: 2 },
  skillBarBg: { width: "100%", height: 4, backgroundColor: colors.borderGray, borderRadius: 2, marginBottom: 6 },
  skillBarFill: { height: 4, borderRadius: 2, backgroundColor: colors.primary },
  toolTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, fontSize: 8, backgroundColor: colors.primaryLight, color: colors.darkGray, marginRight: 4, marginBottom: 4 },
  expBlock: { paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: "#ddd5f5", marginBottom: 12 },
  expDot: { position: "absolute", left: -6, top: 3, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  expTitle: { fontSize: 11, fontWeight: "bold", color: colors.dark },
  expCompany: { fontSize: 10, fontWeight: "bold", color: colors.primary, marginTop: 1 },
  expDate: { fontSize: 8, color: colors.gray },
  bullet: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 2 },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: colors.darkGray },
  eduInst: { fontSize: 9, color: colors.primary, fontWeight: "bold", marginTop: 1 },
  eduDate: { fontSize: 8, color: colors.lightGray },
});

const GeometricModernPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  const allSkills = d.skills.flatMap(c => c.skills).filter(sk => sk.trim());

  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View wrap={false} style={{ position: "relative", marginBottom: 6 }}>
          <View style={s.headerBar} />
          <View style={{ paddingLeft: 8 }}>
            <Text style={s.name}>{d.personalInfo.name}</Text>
            <Text style={s.title}>{d.personalInfo.title}</Text>
          </View>
        </View>

        <View style={s.contactGrid} wrap={false}>
          {d.personalInfo.email && (
            <View style={s.contactBox}><View style={s.contactIconBox}><Text style={s.contactIcon}>✉</Text></View><Text>{d.personalInfo.email}</Text></View>
          )}
          {d.personalInfo.phone && (
            <View style={s.contactBox}><View style={s.contactIconBox}><Text style={s.contactIcon}>☎</Text></View><Text>{d.personalInfo.phone}</Text></View>
          )}
          {d.personalInfo.location && (
            <View style={s.contactBox}><View style={s.contactIconBox}><Text style={s.contactIcon}>📍</Text></View><Text>{d.personalInfo.location}</Text></View>
          )}
          {d.personalInfo.linkedin && (
            <View style={s.contactBox}><View style={s.contactIconBox}><Text style={s.contactIcon}>in</Text></View><Text>{d.personalInfo.linkedin}</Text></View>
          )}
        </View>

        <View style={s.body}>
          {/* Left Column */}
          <View style={s.leftCol}>
            {d.summary && (
              <View style={s.section}>
                <View style={s.sectionHeader}><View style={s.sectionBar} /><Text style={s.sectionTitle}>Profile</Text></View>
                <Text style={s.summary}>{d.summary}</Text>
              </View>
            )}

            {allSkills.length > 0 && (
              <View style={s.section}>
                <View style={s.sectionHeader}><View style={s.sectionBar} /><Text style={s.sectionTitle}>Skills</Text></View>
                {allSkills.slice(0, 6).map((skill, idx) => (
                  <View key={idx}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={s.skillName}>{skill}</Text>
                      <Text style={{ fontSize: 8, color: colors.primary, fontWeight: "bold" }}>{Math.max(50, 95 - idx * 5)}%</Text>
                    </View>
                    <View style={s.skillBarBg}>
                      <View style={{ ...s.skillBarFill, width: `${Math.max(50, 95 - idx * 5)}%` }} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {d.skills.length > 0 && (
              <View style={s.section} wrap={false}>
                <View style={s.sectionHeader}><View style={s.sectionBar} /><Text style={s.sectionTitle}>Tools</Text></View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {allSkills.slice(0, 8).map((tool, idx) => (
                    <Text key={idx} style={s.toolTag}>{tool}</Text>
                  ))}
                </View>
              </View>
            )}

            {d.education.length > 0 && d.education[0].institution && (
              <View style={s.section} wrap={false}>
                <View style={s.sectionHeader}><View style={s.sectionBar} /><Text style={s.sectionTitle}>Education</Text></View>
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
            {d.experience.length > 0 && d.experience[0].position && (
              <View style={s.section}>
                <View style={s.sectionHeader}><View style={s.sectionBar} /><Text style={{ ...s.sectionTitle, fontSize: 14 }}>Experience</Text></View>
                {d.experience.map((exp, i) => (
                  <View key={exp.id} style={s.expBlock} wrap={false} minPresenceAhead={40}>
                    <View style={{ ...s.expDot, backgroundColor: i === 0 ? colors.primary : colors.accent }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
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

export default GeometricModernPdf;
