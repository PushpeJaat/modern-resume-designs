import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors } from "./styles";

const s = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0, fontSize: 10, fontFamily: "Helvetica", color: colors.darkGray },
  header: { backgroundColor: colors.slate800, paddingHorizontal: 40, paddingVertical: 24, flexDirection: "row", alignItems: "center", gap: 20 },
  photo: { width: 70, height: 70, borderRadius: 10, objectFit: "cover" },
  initialsBox: { width: 70, height: 70, borderRadius: 10, backgroundColor: colors.slate600, justifyContent: "center", alignItems: "center" },
  initials: { fontSize: 24, fontWeight: "bold", color: "#cccccc" },
  headerName: { fontSize: 24, fontWeight: "bold", color: colors.white, marginBottom: 2 },
  headerTitle: { fontSize: 13, color: "#cccccc", marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: { fontSize: 8, color: "#aaaaaa" },
  contactLabel: { fontWeight: "bold", marginRight: 3 },
  body: { paddingHorizontal: 40, paddingTop: 20 },
  section: { marginBottom: 14 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  sectionBar: { width: 20, height: 2, backgroundColor: colors.slate800, borderRadius: 1 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: colors.slate800 },
  summary: { fontSize: 9, lineHeight: 1.6, color: colors.gray },
  expBlock: { paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: colors.borderGray, marginBottom: 12 },
  expDot: { position: "absolute", left: -5, top: 3, width: 6, height: 6, borderRadius: 3, backgroundColor: colors.slate800 },
  expTitle: { fontSize: 11, fontWeight: "bold", color: colors.slate800 },
  expCompany: { fontSize: 9, color: colors.gray, fontWeight: "bold" },
  expDate: { fontSize: 8, color: colors.lightGray, backgroundColor: colors.bgLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  bullet: { fontSize: 9, lineHeight: 1.6, color: colors.gray, marginBottom: 2, paddingLeft: 8 },
  grid: { flexDirection: "row", gap: 24 },
  halfCol: { width: "50%" },
  eduDegree: { fontSize: 10, fontWeight: "bold", color: colors.slate800 },
  eduInst: { fontSize: 9, color: colors.gray },
  eduDate: { fontSize: 8, color: colors.lightGray },
  skillCat: { fontSize: 8, fontWeight: "bold", color: colors.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  skillTag: { paddingHorizontal: 6, paddingVertical: 3, fontSize: 8, backgroundColor: colors.bgLight, borderRadius: 4, borderWidth: 1, borderColor: colors.borderGray, color: colors.darkGray, marginRight: 4, marginBottom: 4 },
});

const PhotoModernPdf = ({ data }: { data: ResumeData }) => {
  const d = data;
  const initials = d.personalInfo.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  const photoUrl = d.personalInfo.photoUrl;

  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.header} wrap={false}>
          {photoUrl ? (
            <Image src={photoUrl} style={s.photo} />
          ) : (
            <View style={s.initialsBox}><Text style={s.initials}>{initials}</Text></View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={s.headerName}>{d.personalInfo.name}</Text>
            <Text style={s.headerTitle}>{d.personalInfo.title}</Text>
            <View style={s.contactRow}>
              {d.personalInfo.email && <Text style={s.contactItem}><Text style={s.contactLabel}>Email:</Text> {d.personalInfo.email}</Text>}
              {d.personalInfo.phone && <Text style={s.contactItem}><Text style={s.contactLabel}>Phone:</Text> {d.personalInfo.phone}</Text>}
              {d.personalInfo.location && <Text style={s.contactItem}><Text style={s.contactLabel}>Location:</Text> {d.personalInfo.location}</Text>}
            </View>
            <View style={{ ...s.contactRow, marginTop: 3 }}>
              {d.personalInfo.linkedin && <Text style={s.contactItem}><Text style={s.contactLabel}>LinkedIn:</Text> {d.personalInfo.linkedin}</Text>}
              {d.personalInfo.website && <Text style={s.contactItem}><Text style={s.contactLabel}>Web:</Text> {d.personalInfo.website}</Text>}
              {d.personalInfo.github && <Text style={s.contactItem}><Text style={s.contactLabel}>GitHub:</Text> {d.personalInfo.github}</Text>}
            </View>
          </View>
        </View>

        <View style={s.body}>
          {/* Summary */}
          {d.summary && (
            <View style={s.section}>
              <View style={s.sectionHeader}><View style={s.sectionBar} /><Text style={s.sectionTitle}>About Me</Text></View>
              <Text style={s.summary}>{d.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {d.experience.length > 0 && d.experience[0].position && (
            <View style={s.section}>
              <View style={s.sectionHeader} minPresenceAhead={48}><View style={s.sectionBar} /><Text style={s.sectionTitle}>Experience</Text></View>
              {d.experience.map((exp) => (
                <View key={exp.id} style={s.expBlock} wrap={false}>
                  <View style={s.expDot} />
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

          {/* Education & Skills */}
          <View style={s.grid}>
            {d.education.length > 0 && d.education[0].institution && (
              <View style={s.halfCol}>
                <View style={s.sectionHeader} minPresenceAhead={48}><View style={s.sectionBar} /><Text style={s.sectionTitle}>Education</Text></View>
                {d.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 6 }} wrap={false}>
                    <Text style={s.eduDegree}>{edu.degree} {edu.field}</Text>
                    <Text style={s.eduInst}>{edu.institution}</Text>
                    <Text style={s.eduDate}>{edu.startDate} - {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}

            {d.skills.length > 0 && (
              <View style={s.halfCol}>
                <View style={s.sectionHeader} minPresenceAhead={48}><View style={s.sectionBar} /><Text style={s.sectionTitle}>Skills</Text></View>
                {d.skills.map((cat, i) => (
                  <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                    <Text style={s.skillCat}>{cat.category}</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {cat.skills.filter(sk => sk.trim()).map((skill, idx) => (
                        <Text key={idx} style={s.skillTag}>{skill}</Text>
                      ))}
                    </View>
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

export default PhotoModernPdf;
