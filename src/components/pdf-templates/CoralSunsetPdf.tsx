<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', Arial, sans-serif;
      margin: 0;
      padding: 30px 40px;
      color: #333;
      font-size: 12px;
      background: white;
    }

    .container {
      width: 100%;
    }

    /* HEADER */
    .header {
      display: flex;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 15px;
      margin-bottom: 20px;
      gap: 12px;
    }

    .accent-bar {
      width: 4px;
      background: #4f46e5;
      border-radius: 2px;
    }

    .header-content {
      flex: 1;
    }

    .name-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .name {
      font-size: 28px;
      font-weight: 700;
    }

    .title {
      font-size: 16px;
      color: #666;
    }

    .initials {
      width: 50px;
      height: 50px;
      border: 2px solid #4f46e5;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #4f46e5;
    }

    .contact {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 10px;
    }

    .contact-item {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .icon {
      width: 22px;
      height: 22px;
      background: #eef2ff;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: #4f46e5;
    }

    /* BODY */
    .body {
      display: flex;
      gap: 20px;
    }

    .left {
      width: 33%;
    }

    .right {
      width: 67%;
    }

    .section {
      margin-bottom: 16px;
      page-break-inside: avoid;
    }

    .section-title {
      font-weight: 700;
      margin-bottom: 6px;
      font-size: 14px;
    }

    .about-box {
      background: #f8fafc;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      line-height: 1.5;
    }

    .skill-card {
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }

    .skill-title {
      font-size: 10px;
      font-weight: 600;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }

    .skill-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .dots {
      display: flex;
      gap: 3px;
    }

    .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #4f46e5;
    }

    .dot.empty {
      background: #ddd;
    }

    .tag {
      display: inline-block;
      border: 1px solid #4f46e5;
      padding: 2px 6px;
      border-radius: 4px;
      margin: 2px;
      font-size: 10px;
    }

    .exp-card {
      border-left: 3px solid #4f46e5;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 6px;
      background: #fff;
      page-break-inside: avoid;
    }

    .exp-title {
      font-weight: 600;
    }

    .exp-company {
      color: #4f46e5;
      font-weight: 600;
      font-size: 12px;
    }

    .exp-date {
      font-size: 10px;
      color: #666;
    }

    .bullet {
      margin-left: 10px;
      line-height: 1.4;
      margin-bottom: 3px;
    }

    /* PAGINATION FIX */
    h1, h2, h3 {
      page-break-after: avoid;
    }

  </style>
</head>

<body>

<div class="container">

  <!-- HEADER -->
  <div class="header">
    <div class="accent-bar"></div>

    <div class="header-content">
      <div class="name-row">
        <div>
          <div class="name">{{name}}</div>
          <div class="title">{{title}}</div>
        </div>
        <div class="initials">{{initials}}</div>
      </div>

      <div class="contact">
        {{#if email}}<div class="contact-item"><div class="icon">E</div>{{email}}</div>{{/if}}
        {{#if phone}}<div class="contact-item"><div class="icon">P</div>{{phone}}</div>{{/if}}
        {{#if location}}<div class="contact-item"><div class="icon">L</div>{{location}}</div>{{/if}}
        {{#if website}}<div class="contact-item"><div class="icon">W</div>{{website}}</div>{{/if}}
      </div>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">

    <!-- LEFT -->
    <div class="left">

      <div class="section">
        <div class="section-title">About Me</div>
        <div class="about-box">{{summary}}</div>
      </div>

      {{#each skills}}
      <div class="skill-card">
        <div class="skill-title">{{category}}</div>

        {{#each skills}}
        <div class="skill-row">
          <span>{{this}}</span>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot empty"></div>
            <div class="dot empty"></div>
          </div>
        </div>
        {{/each}}

      </div>
      {{/each}}

    </div>

    <!-- RIGHT -->
    <div class="right">

      <div class="section">
        <div class="section-title">Work Experience</div>

        {{#each experience}}
        <div class="exp-card">
          <div class="exp-title">{{position}}</div>
          <div class="exp-company">{{company}}</div>
          <div class="exp-date">{{startDate}} - {{endDate}}</div>

          {{#each responsibilities}}
          <div class="bullet">• {{this}}</div>
          {{/each}}

        </div>
        {{/each}}

      </div>

    </div>

  </div>

</div>

</body>
</html>