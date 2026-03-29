import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 35, paddingBottom: 30, paddingHorizontal: 40, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  headerRow: { flexDirection: "row", gap: 12, marginBottom: 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.borderGray },
  accentBar: { width: 3, backgroundColor: colors.primary, borderRadius: 2 },
  nameBlock: { flex: 1 },
  nameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 },
  name: { fontSize: 28, fontWeight: "bold", color: colors.dark },
  title: { fontSize: 16, color: colors.gray, marginTop: 2 },
  initialsBox: { width: 50, height: 50, borderRadius: 10, borderWidth: 2, borderColor: colors.primary, justifyContent: "center", alignItems: "center" },
  initials: { fontSize: 18, fontWeight: "bold", color: colors.primary },
  contactGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  contactIconBox: { width: 24, height: 24, borderRadius: 6, backgroundColor: colors.primaryLight, justifyContent: "center", alignItems: "center" },
  contactIcon: { fontSize: 9, color: colors.primary, fontWeight: "bold" },
  contactLabel: { fontSize: 7, color: colors.gray },
  contactValue: { fontSize: 9, fontWeight: "bold", color: colors.darkGray },
  body: { flexDirection: "row", gap: 20 },
  leftCol: { width: "33%" },
  rightCol: { width: "67%" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 8 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: colors.dark },
  section: { marginBottom: 14 },
  aboutBox: { padding: 10, backgroundColor: "#f5f3ff", borderRadius: 8, borderWidth: 1, borderColor: "#ede9fe" },
  aboutText: { fontSize: 8, lineHeight: 1.6, color: colors.darkGray },
  skillCard: { padding: 8, borderRadius: 6, borderWidth: 1, marginBottom: 8 },
  skillCatName: { fontSize: 8, fontWeight: "bold", color: colors.dark, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  skillDotRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  skillName: { fontSize: 8, color: colors.darkGray },
  dotsRow: { flexDirection: "row", gap: 2 },
  dotFilled: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.primary },
  dotEmpty: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.borderGray },
  toolTag: { paddingHorizontal: 5, paddingVertical: 2, fontSize: 8, borderRadius: 3, borderWidth: 1, borderColor: "#c4b5fd", backgroundColor: "#faf8ff", color: colors.darkGray, marginRight: 4, marginBottom: 4 },
  expCard: { padding: 10, backgroundColor: colors.white, borderRadius: 6, borderLeftWidth: 3, marginBottom: 10 },
  expTitle: { fontSize: 11, fontWeight: "bold", color: colors.dark },
  expCompany: { fontSize: 9, color: colors.primary, fontWeight: "bold", marginTop: 1 },
  expDate: { fontSize: 8, color: colors.gray, backgroundColor: colors.primaryLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  bullet: { fontSize: 9, lineHeight: 1.6, color: colors.darkGray, marginBottom: 2 },
  eduDegree: { fontSize: 9, fontWeight: "bold", color: colors.darkGray },
  eduInst: { fontSize: 8, color: colors.primary, fontWeight: "bold", marginTop: 1 },
  eduDate: { fontSize: 8, color: colors.lightGray },
});

const DottedPatternPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  const initials = d.personalInfo.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.headerRow} wrap={false}>
          <View style={s.accentBar} />
          <View style={s.nameBlock}>
            <View style={s.nameRow}>
              <View>
                <Text style={s.name}>{d.personalInfo.name}</Text>
                <Text style={s.title}>{d.personalInfo.title}</Text>
              </View>
              <View style={s.initialsBox}>
                <Text style={s.initials}>{initials}</Text>
              </View>
            </View>
            <View style={s.contactGrid}>
              {d.personalInfo.email && (
                <View style={s.contactItem}>
                  <View style={s.contactIconBox}><Text style={s.contactIcon}>✉</Text></View>
                  <View><Text style={s.contactLabel}>Email</Text><Text style={s.contactValue}>{d.personalInfo.email}</Text></View>
                </View>
              )}
              {d.personalInfo.phone && (
                <View style={s.contactItem}>
                  <View style={{ ...s.contactIconBox, backgroundColor: colors.accentLight }}><Text style={{ ...s.contactIcon, color: colors.accent }}>☎</Text></View>
                  <View><Text style={s.contactLabel}>Phone</Text><Text style={s.contactValue}>{d.personalInfo.phone}</Text></View>
                </View>
              )}
              {d.personalInfo.location && (
                <View style={s.contactItem}>
                  <View style={s.contactIconBox}><Text style={s.contactIcon}>📍</Text></View>
                  <View><Text style={s.contactLabel}>Location</Text><Text style={s.contactValue}>{d.personalInfo.location}</Text></View>
                </View>
              )}
              {d.personalInfo.website && (
                <View style={s.contactItem}>
                  <View style={{ ...s.contactIconBox, backgroundColor: colors.accentLight }}><Text style={{ ...s.contactIcon, color: colors.accent }}>🌐</Text></View>
                  <View><Text style={s.contactLabel}>Website</Text><Text style={s.contactValue}>{d.personalInfo.website}</Text></View>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={s.body}>
          {/* Left */}
          <View style={s.leftCol}>
            {d.summary && (
              <View style={s.section} wrap={false}>
                <View style={s.sectionHeader}><View style={{ ...s.dot, backgroundColor: colors.primary }} /><Text style={s.sectionTitle}>About Me</Text></View>
                <View style={s.aboutBox}><Text style={s.aboutText}>{d.summary}</Text></View>
              </View>
            )}

            {d.skills.length > 0 && d.skills.map((cat, i) => (
              <View key={i} style={{ ...s.skillCard, borderColor: i === 0 ? "#ddd5f5" : "#fde68a" }} wrap={false}>
                <View style={s.sectionHeader}><View style={{ ...s.dot, backgroundColor: i === 0 ? colors.primary : colors.accent }} /><Text style={s.skillCatName}>{cat.category}</Text></View>
                {i === 0 ? (
                  cat.skills.filter(sk => sk.trim()).map((skill, idx) => (
                    <View key={idx} style={s.skillDotRow}>
                      <Text style={s.skillName}>{skill}</Text>
                      <View style={s.dotsRow}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <View key={j} style={j < Math.max(3, 5 - idx) ? s.dotFilled : s.dotEmpty} />
                        ))}
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {cat.skills.filter(sk => sk.trim()).map((tool, idx) => (
                      <Text key={idx} style={s.toolTag}>{tool}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}

            {d.education.length > 0 && d.education[0].institution && (
              <View style={{ ...s.skillCard, borderColor: "#ddd5f5" }} wrap={false}>
                <View style={s.sectionHeader}><View style={{ ...s.dot, backgroundColor: colors.primary }} /><Text style={s.sectionTitle}>Education</Text></View>
                {d.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 4 }}>
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
                <View style={s.sectionHeader}><View style={{ ...s.dot, backgroundColor: colors.primary, width: 8, height: 8, borderRadius: 2 }} /><Text style={{ ...s.sectionTitle, fontSize: 14 }}>Work Experience</Text></View>
                {d.experience.map((exp, i) => (
                  <View key={exp.id} style={{ ...s.expCard, borderLeftColor: i % 2 === 0 ? colors.primary : colors.accent }} wrap={false} minPresenceAhead={40}>
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

export default DottedPatternPdf;
