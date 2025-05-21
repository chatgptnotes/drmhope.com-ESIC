 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/AGENTS.md
index 0000000..113304b 100644
--- a//dev/null
+++ b/AGENTS.md
@@ -0,0 +1,88 @@
+# Hope Hospital Management System Guidelines
+
+This document summarizes the project's billing flow and key requirements for the Hope Hospital Management System. It acts as guidance for contributors working within this repository.
+
+## Detailed Billing Flow
+The billing process integrates diagnosis, surgeries, investigations, and medications to generate ESIC-compliant bills. Below is a concise breakdown:
+
+1. **Patient Selection and Diagnosis**
+   - Select or create the patient record.
+   - Choose the primary diagnosis and add related complications or additional diagnoses.
+
+2. **Surgery Selection**
+   - If surgery is required, select an approved surgery for the diagnosis.
+   - Link any surgical complications to the diagnosis-related complications.
+
+3. **Suggested Investigations**
+   - Based on the diagnoses and complications, the system suggests investigations (radiology, laboratory, etc.).
+   - The user reviews and adds the required investigations for the patient's stay.
+
+4. **Suggested Medications**
+   - Medications are suggested according to diagnosis, complications, and surgeries.
+   - Record daily medications during the patient's stay.
+
+5. **Daily Tracking**
+   - For each day, select medications administered and investigations performed.
+   - This ensures all services are accurately billed.
+
+6. **Bill Preparation**
+   - Compile all records into an ESIC-formatted bill including patient details, diagnoses, surgeries, investigations, medications, costs, and codes.
+
+7. **Bill Review and Adjustment**
+   - Review the bill for accuracy and make corrections if needed.
+   - Validate against ESIC rules to minimize errors.
+
+8. **Finalization and Printing**
+   - Finalize the bill in the patient record.
+   - Provide options to print or export the bill in the official ESIC format.
+
+**Key Points**
+- The billing flow is guided and suggests investigations and medications automatically.
+- Daily tracking of medications and investigations is supported.
+- Bills follow ESIC's itemized format with proper service coding.
+- These steps ensure accuracy and compliance for billing officers.
+
+## Hope Hospital Management System Requirements
+
+1. **Project Overview**
+   - Web-based application for hospital administrative and clinical processes covering both IPD and OPD.
+   - Modules include patient management, billing, reporting, master data management, ambulance aggregation, and a portal for unregistered patients.
+
+2. **Technical Stack**
+   - **Frontend:** Next.js with React and Tailwind CSS using Radix UI (Shadcn) and custom components.
+   - **Icons:** Lucide React.
+   - **State Management:** React hooks (with a database connection in production).
+   - **Database:** Supabase.
+
+3. **User Roles and Access**
+   - Roles: Super Admin, Hospital Admin, Doctors, Nurses, Receptionists, Billing Officers.
+   - Role-based access control with Super Admin having full permissions.
+
+4. **Core Modules**
+   - **Dashboard:** Separate dashboards for today's IPD and OPD with metrics and patient lists.
+   - **Patient Management:** Registration, patient dashboard, and visit history.
+   - **Visit Management:** IPD and OPD visit details, including billing and case sheets.
+   - **Clinical:** Manage diagnoses, surgeries, investigations, and medications.
+   - **Billing:** Generate detailed bills (ESIC and CGHS) with service codes and package rates.
+   - **Administrative:** Manage staff, users, approvals, and reports.
+
+5. **Functional Requirements**
+   - Collapsible sidebar navigation, search capabilities, standardized forms, document generation, and data visualization.
+
+6. **Non-Functional Requirements**
+   - Focus on performance, security, availability, and scalability.
+
+7. **Future Enhancements**
+   - Possible integration with lab equipment, mobile applications, telemedicine, insurance, AI-assisted diagnosis, and more.
+
+8. **Glossary**
+   - IPD: In-Patient Department
+   - OPD: Out-Patient Department
+   - CGHS: Central Government Health Scheme
+   - ESIC: Employees' State Insurance Corporation
+   - PMJAY: Pradhan Mantri Jan Arogya Yojana (referred to as "Yojna")
+   - Raftaar Patient: Patient registered for ambulance services only.
+
+## Raftaar Patient Portal Integration
+Unregistered patients can access emergency ambulance services via the Raftaar Patient Portal. The Super Admin manages these patients and dispatches ambulances through the centralized aggregator system.
+
 
EOF
)
