import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const purple = "hsl(255,60%,28%)";
const purpleMid = "hsl(270,55%,38%)";
const purpleLight = "hsl(255,40%,96%)";
const purpleLighter = "hsl(255,30%,98%)";
const purpleBorder = "hsl(255,30%,88%)";
const gold = "hsl(45,90%,55%)";
const sidebarBg = "hsl(255,20%,97%)";
const textDark = "#1a1a2e";
const textGray = "#6b6b8a";
const textLight = "#9494aa";

const s = StyleSheet.create({
  page: {
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  // Header
  header: {
    paddingHorizontal: 36,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: purple,
    position: "relative",
  },
  photo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    objectFit: "cover",
    border: `3px solid ${gold}`,
  },
  photoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.15)",
    border: `3px solid ${gold}`,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    marginBottom: 2,
  },
  titleRole: {
    fontSize: 9,
    color: gold,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contactItem: {
    fontSize: 7.5,
    color: "rgba(255,255,255,0.7)",
  },
  goldBar: {
    height: 3,
    backgroundColor: gold,
  },
  // Body
  body: {
    flexDirection: "row",
    flex: 1,
  },
  // Sidebar
  sidebar: {
    width: "32%",
    backgroundColor: sidebarBg,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  sidebarHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 8,
  },
  sidebarAccentBar: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: purple,
  },
  sidebarHeading: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: purple,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  sidebarSection: {
    marginBottom: 16,
  },
  // Skill bars
  skillCatLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: purple,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 5,
  },
  skillRow: {
    marginBottom: 5,
  },
  skillLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  skillName: {
    fontSize: 8,
    color: textDark,
  },
  skillPct: {
    fontSize: 7,
    color: textLight,
  },
  skillBarBg: {
    height: 4,
    backgroundColor: "#e0e0ea",
    borderRadius: 2,
    overflow: "hidden",
  },
  skillBarFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: purple,
  },
  // Education
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: textDark,
  },
  eduInst: {
    fontSize: 7.5,
    color: textGray,
    marginTop: 1,
  },
  eduDate: {
    fontSize: 7,
    color: textLight,
    marginTop: 1,
  },
  eduGpa: {
    fontSize: 7,
    color: purpleMid,
    fontFamily: "Helvetica-Bold",
  },
  // Cert / achievement items
  bulletItem: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 5,
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: gold,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 7.5,
    color: textDark,
    flex: 1,
    lineHeight: 1.4,
  },
  // Right panel
  rightPanel: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  contentSection: {
    marginBottom: 16,
  },
  contentHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: purpleBorder,
    paddingBottom: 3,
  },
  contentHeading: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: purple,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 8.5,
    color: "#4b4b6b",
    lineHeight: 1.55,
  },
  // Experience
  expItem: {
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: purpleBorder,
  },
  expHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: textDark,
  },
  expCompany: {
    fontSize: 8.5,
    color: purpleMid,
    fontFamily: "Helvetica-Bold",
  },
  expDateBadge: {
    fontSize: 7.5,
    color: purpleMid,
    backgroundColor: purpleLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  respBullet: {
    flexDirection: "row",
    gap: 5,
    marginTop: 3,
    alignItems: "flex-start",
  },
  respDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: purple,
    marginTop: 3,
  },
  respText: {
    fontSize: 8,
    color: "#4b4b6b",
    flex: 1,
    lineHeight: 1.4,
  },
  // Project cards
  projCard: {
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: purpleBorder,
    borderRadius: 5,
    backgroundColor: purpleLighter,
  },
  projNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  projName: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: textDark,
  },
  projUrl: {
    fontSize: 7,
    color: purpleMid,
  },
  projDesc: {
    fontSize: 7.5,
    color: textGray,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  techTag: {
    fontSize: 6.5,
    color: purple,
    backgroundColor: purpleLight,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    fontFamily: "Helvetica-Bold",
  },
});

const accentSkillLevels = [95, 90, 88, 85, 80, 78, 75, 70, 68, 65, 62, 58];

const PurplePeakPdf = ({ data }: { data: ResumeData }) => {
  const d = data;

  return (
    <Document>
      <Page size="A4" style={s.page} wrap>
        {/* Header */}
        <View style={s.header} wrap={false}>
          {d.personalInfo.photoUrl ? (
            <Image src={d.personalInfo.photoUrl} style={s.photo} />
          ) : (
            <View style={s.photoPlaceholder} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{d.personalInfo.name}</Text>
            <Text style={s.titleRole}>{d.personalInfo.title}</Text>
            <View style={s.contactRow}>
              {d.personalInfo.email && <Text style={s.contactItem}>{d.personalInfo.email}</Text>}
              {d.personalInfo.phone && <Text style={s.contactItem}>{d.personalInfo.phone}</Text>}
              {d.personalInfo.location && <Text style={s.contactItem}>{d.personalInfo.location}</Text>}
              {d.personalInfo.linkedin && <Text style={s.contactItem}>{d.personalInfo.linkedin}</Text>}
              {d.personalInfo.github && <Text style={s.contactItem}>{d.personalInfo.github}</Text>}
              {d.personalInfo.website && <Text style={s.contactItem}>{d.personalInfo.website}</Text>}
            </View>
          </View>
        </View>
        <View style={s.goldBar} />

        {/* Body */}
        <View style={s.body}>
          {/* Sidebar */}
          <View style={s.sidebar}>
            {/* Skills */}
            {d.skills.length > 0 && (
              <View style={s.sidebarSection}>
                <View style={s.sidebarHeadingRow}>
                  <View style={s.sidebarAccentBar} />
                  <Text style={s.sidebarHeading}>Skills</Text>
                </View>
                {d.skills.map((cat, ci) => (
                  <View key={ci} style={{ marginBottom: 10 }} minPresenceAhead={30}>
                    <Text style={s.skillCatLabel}>{cat.category}</Text>
                    {cat.skills.filter((sk) => sk.trim()).map((skill, si) => {
                      const level = accentSkillLevels[(ci * 6 + si) % accentSkillLevels.length];
                      return (
                        <View key={si} style={s.skillRow}>
                          <View style={s.skillLabelRow}>
                            <Text style={s.skillName}>{skill}</Text>
                            <Text style={s.skillPct}>{level}%</Text>
                          </View>
                          <View style={s.skillBarBg}>
                            <View style={[s.skillBarFill, { width: `${level}%` }]} />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {d.education.length > 0 && (
              <View style={s.sidebarSection} minPresenceAhead={40}>
                <View style={s.sidebarHeadingRow}>
                  <View style={s.sidebarAccentBar} />
                  <Text style={s.sidebarHeading}>Education</Text>
                </View>
                {d.education.map((edu) => (
                  <View key={edu.id} style={s.eduItem}>
                    <Text style={s.eduDegree}>{edu.degree} {edu.field}</Text>
                    <Text style={s.eduInst}>{edu.institution}</Text>
                    <View style={{ flexDirection: "row", gap: 6, marginTop: 1 }}>
                      <Text style={s.eduDate}>{edu.startDate} – {edu.endDate}</Text>
                      {edu.gpa && <Text style={s.eduGpa}>GPA {edu.gpa}</Text>}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {d.certifications && d.certifications.length > 0 && (
              <View style={s.sidebarSection} minPresenceAhead={40}>
                <View style={s.sidebarHeadingRow}>
                  <View style={s.sidebarAccentBar} />
                  <Text style={s.sidebarHeading}>Certifications</Text>
                </View>
                {d.certifications.map((cert, i) => (
                  <View key={i} style={s.bulletItem}>
                    <View style={s.bulletDot} />
                    <Text style={s.bulletText}>{cert}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            {d.achievements && d.achievements.length > 0 && (
              <View style={s.sidebarSection} minPresenceAhead={40}>
                <View style={s.sidebarHeadingRow}>
                  <View style={s.sidebarAccentBar} />
                  <Text style={s.sidebarHeading}>Highlights</Text>
                </View>
                {d.achievements.map((ach, i) => (
                  <View key={i} style={s.bulletItem}>
                    <View style={[s.bulletDot, { backgroundColor: purple }]} />
                    <Text style={s.bulletText}>{ach}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Panel */}
          <View style={s.rightPanel}>
            {/* Summary */}
            {d.summary && (
              <View style={s.contentSection}>
                <View style={s.contentHeadingRow}>
                  <Text style={s.contentHeading}>Professional Summary</Text>
                </View>
                <Text style={s.summaryText}>{d.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {d.experience.length > 0 && (
              <View style={s.contentSection}>
                <View style={s.contentHeadingRow}>
                  <Text style={s.contentHeading}>Work Experience</Text>
                </View>
                {d.experience.map((exp) => (
                  <View key={exp.id} style={s.expItem} minPresenceAhead={50}>
                    <View style={s.expHeaderRow}>
                      <View>
                        <Text style={s.expPosition}>{exp.position}</Text>
                        <Text style={s.expCompany}>{exp.company}</Text>
                      </View>
                      <Text style={s.expDateBadge}>
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                    {exp.responsibilities.filter((r) => r.trim()).slice(0, 5).map((r, ri) => (
                      <View key={ri} style={s.respBullet}>
                        <View style={s.respDot} />
                        <Text style={s.respText}>{r}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {d.projects && d.projects.length > 0 && (
              <View style={s.contentSection}>
                <View style={s.contentHeadingRow}>
                  <Text style={s.contentHeading}>Featured Projects</Text>
                </View>
                {d.projects.map((proj) => (
                  <View key={proj.id} style={s.projCard} minPresenceAhead={40}>
                    <View style={s.projNameRow}>
                      <Text style={s.projName}>{proj.name}</Text>
                      {proj.url && <Text style={s.projUrl}>{proj.url}</Text>}
                    </View>
                    <Text style={s.projDesc}>{proj.description}</Text>
                    <View style={s.techRow}>
                      {proj.technologies.map((tech, ti) => (
                        <Text key={ti} style={s.techTag}>{tech}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Footer gradient bar */}
        <View style={{ height: 3, backgroundColor: gold }} />
      </Page>
    </Document>
  );
};

export default PurplePeakPdf;
