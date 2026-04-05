import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica" },
  body: { flexDirection: "row", minHeight: "100%" },
  sidebar: { width: "35%", backgroundColor: colors.dark, color: colors.white, paddingHorizontal: 20, paddingTop: 30, paddingBottom: 30 },
  main: { width: "65%", paddingHorizontal: 24, paddingTop: 30, paddingBottom: 30, color: colors.darkGray },
  name: { fontSize: 18, fontWeight: "bold", color: colors.white, marginBottom: 3 },
  title: { fontSize: 10, color: colors.skyBlue, marginBottom: 16 },
  sidebarSection: { marginBottom: 16 },
  sidebarTitle: { fontSize: 8, fontWeight: "bold", color: colors.white, textTransform: "uppercase", letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: colors.slate600, paddingBottom: 4, marginBottom: 8 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5, fontSize: 8 },
  contactLabel: { color: colors.skyBlue, fontSize: 7, fontWeight: "bold" },
  contactText: { color: "#cbd5e1" },
  skillName: { fontSize: 8, color: colors.white, marginBottom: 2 },
  skillBarBg: { height: 4, backgroundColor: colors.slate600, borderRadius: 2, marginBottom: 6 },
  skillBarFill: { height: 4, backgroundColor: colors.skyBlue, borderRadius: 2 },
  eduDegree: { fontSize: 9, fontWeight: "bold", color: colors.white },
  eduInst: { fontSize: 8, color: "#94a3b8" },
  eduDate: { fontSize: 7, color: "#64748b" },
  mainTitle: { fontSize: 10, fontWeight: "bold", color: colors.dark, textTransform: "uppercase", letterSpacing: 2, borderBottomWidth: 2, borderBottomColor: colors.borderGray, paddingBottom: 4, marginBottom: 10 },
  profileText: { fontSize: 9, lineHeight: 1.5, color: colors.gray },
  section: { marginBottom: 16 },
  expTitle: { fontSize: 10, fontWeight: "bold", color: colors.dark },
  expMeta: { fontSize: 8, color: colors.gray, marginBottom: 4 },
  bullet: { fontSize: 9, lineHeight: 1.4, color: colors.gray, marginBottom: 2, paddingLeft: 8 },
  projName: { fontWeight: "bold" },
  projItem: { fontSize: 9, color: colors.gray, marginBottom: 3, paddingLeft: 8 },
});

const DarkSidebarPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  const allSkills = d.skills.flatMap(c => c.skills).filter(sk => sk.trim());

  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        <View style={s.body}>
          <View style={s.sidebar}>
            <View wrap={false}>
              <Text style={s.name}>{d.personalInfo.name}</Text>
              <Text style={s.title}>{d.personalInfo.title}</Text>
            </View>

            <View style={s.sidebarSection}>
              <Text style={s.sidebarTitle}>Contact</Text>
              {d.personalInfo.email && <View style={s.contactItem}><Text style={s.contactLabel}>Email</Text><Text style={s.contactText}>{d.personalInfo.email}</Text></View>}
              {d.personalInfo.phone && <View style={s.contactItem}><Text style={s.contactLabel}>Phone</Text><Text style={s.contactText}>{d.personalInfo.phone}</Text></View>}
              {d.personalInfo.location && <View style={s.contactItem}><Text style={s.contactLabel}>Location</Text><Text style={s.contactText}>{d.personalInfo.location}</Text></View>}
              {d.personalInfo.linkedin && <View style={s.contactItem}><Text style={s.contactLabel}>LinkedIn</Text><Text style={s.contactText}>{d.personalInfo.linkedin}</Text></View>}
              {d.personalInfo.website && <View style={s.contactItem}><Text style={s.contactLabel}>Web</Text><Text style={s.contactText}>{d.personalInfo.website}</Text></View>}
            </View>

            {allSkills.length > 0 && (
              <View style={s.sidebarSection}>
                <Text style={s.sidebarTitle}>Skills</Text>
                {allSkills.map((skill, idx) => (
                  <View key={idx} minPresenceAhead={20}>
                    <Text style={s.skillName}>{skill}</Text>
                    <View style={s.skillBarBg}>
                      <View style={{ ...s.skillBarFill, width: `${Math.max(50, 90 - idx * 8)}%` }} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {d.education.length > 0 && (
              <View style={s.sidebarSection}>
                <Text style={s.sidebarTitle}>Education</Text>
                {d.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 6 }} minPresenceAhead={30}>
                    <Text style={s.eduDegree}>{edu.degree} {edu.field}</Text>
                    <Text style={s.eduInst}>{edu.institution}</Text>
                    <Text style={s.eduDate}>{edu.startDate} - {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={s.main}>
            {d.summary && (
              <View style={s.section}>
                <Text style={s.mainTitle} minPresenceAhead={48}>Profile</Text>
                <Text style={s.profileText}>{d.summary}</Text>
              </View>
            )}

            {d.experience.length > 0 && (
              <View style={s.section}>
                <Text style={s.mainTitle} minPresenceAhead={48}>Experience</Text>
                {d.experience.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 12 }} minPresenceAhead={60}>
                    <Text style={s.expTitle}>{exp.position}</Text>
                    <Text style={s.expMeta}>{exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                    {exp.responsibilities.filter(r => r.trim()).slice(0, 6).map((r, idx) => (
                      <Text key={idx} style={s.bullet}>• {r}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {d.projects && d.projects.length > 0 && (
              <View style={s.section}>
                <Text style={s.mainTitle} minPresenceAhead={48}>Projects</Text>
                {d.projects.map((proj) => (
                  <Text key={proj.id} style={s.projItem} minPresenceAhead={20}>• <Text style={s.projName}>{proj.name}</Text> — {proj.description}</Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DarkSidebarPdf;
