import { useEffect, useMemo, useState } from 'react';
import { Activity, BookOpenText, HeartPulse, Home, PawPrint, ShieldCheck, Users } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../contexts/AuthContext';
import { createResource, deleteResource, getDashboardData, updateResource } from '../services/contentService';
import { getMediaUrl } from '../utils/media';

const resourceConfigs = {
  pets: {
    title: 'Manage Pets',
    path: '/pets',
    idKey: 'pet_id',
    icon: PawPrint,
    columns: ['pet_id', 'photo_url', 'name', 'species', 'breed', 'age', 'gender', 'adopt_status'],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'species', label: 'Species', required: true },
      { name: 'breed', label: 'Breed' },
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'gender', label: 'Gender' },
      { name: 'adopt_status', label: 'Status', type: 'select', required: true, options: ['Available', 'Pending', 'Adopted', 'Fostered'] },
      { name: 'temperament', label: 'Temperament' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'shid', label: 'Shelter ID', type: 'number' },
      { name: 'fid', label: 'Foster Parent ID', type: 'number' },
      { name: 'photo', label: 'Upload one pet picture', type: 'file' },
    ],
  },
  users: {
    title: 'Manage Users',
    path: '/users',
    idKey: 'uid',
    icon: Users,
    columns: ['uid', 'photo_url', 'name', 'email', 'phone', 'user_type', 'housing_type'],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone' },
      { name: 'password', label: 'Password', type: 'password', createOnlyRequired: true },
      { name: 'user_type', label: 'User Type', type: 'select', required: true, options: ['ADOPTER', 'VOLUNTEER', 'ADMIN'] },
      { name: 'housing_type', label: 'Housing Type' },
      { name: 'lifestyle_type', label: 'Lifestyle Type' },
      { name: 'availability', label: 'Availability' },
      { name: 'admin_level', label: 'Admin Level' },
      { name: 'photo', label: 'Upload one user picture', type: 'file' },
    ],
  },
  stories: {
    title: 'Success Stories',
    path: '/success-stories',
    idKey: 'story_id',
    icon: BookOpenText,
    columns: ['story_id', 'photo_url', 'title', 'date', 'adoption_id', 'story_text'],
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'story_text', label: 'Story Text', type: 'textarea', required: true },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'adoption_id', label: 'Adoption ID', type: 'number', required: true },
      { name: 'photo', label: 'Upload one story picture', type: 'file' },
    ],
  },
  shelters: {
    title: 'Manage Shelters',
    path: '/shelters',
    idKey: 'shid',
    icon: Home,
    columns: ['shid', 'shelter_name', 'contact_no', 'address', 'capacity'],
    fields: [
      { name: 'shelter_name', label: 'Shelter Name', required: true },
      { name: 'contact_no', label: 'Contact Number' },
      { name: 'address', label: 'Address' },
      { name: 'capacity', label: 'Capacity', type: 'number', required: true },
    ],
  },
  fosterParents: {
    title: 'Foster Parents',
    path: '/foster-parents',
    idKey: 'fid',
    icon: Users,
    columns: ['fid', 'name', 'phone', 'address', 'housing_capacity', 'experience'],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'phone', label: 'Phone' },
      { name: 'address', label: 'Address' },
      { name: 'housing_capacity', label: 'Housing Capacity', type: 'number' },
      { name: 'experience', label: 'Experience', type: 'number' },
    ],
  },
  applications: {
    title: 'Applications',
    path: '/applications',
    idKey: 'app_id',
    icon: ShieldCheck,
    columns: ['app_id', 'status', 'submission_date', 'uid', 'pet_id', 'applicant_name', 'phone', 'email'],
    fields: [
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Pending', 'Approved', 'Rejected'] },
      { name: 'submission_date', label: 'Submission Date', type: 'date', required: true },
      { name: 'uid', label: 'User ID', type: 'number', required: true },
      { name: 'pet_id', label: 'Pet ID', type: 'number', required: true },
      { name: 'applicant_name', label: 'Applicant Name' },
      { name: 'phone', label: 'Phone' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'housing_type', label: 'Housing Type' },
      { name: 'other_pets', label: 'Other Pets' },
      { name: 'daily_availability', label: 'Daily Availability' },
    ],
  },
  medicalRecords: {
    title: 'Health Records',
    path: '/medical-records',
    idKey: 'mid',
    icon: HeartPulse,
    columns: ['mid', 'pet_id', 'treatment', 'cost', 'date', 'note'],
    fields: [
      { name: 'pet_id', label: 'Pet ID', type: 'number', required: true },
      { name: 'treatment', label: 'Treatment', required: true },
      { name: 'cost', label: 'Cost', type: 'number', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'note', label: 'Note', type: 'textarea' },
    ],
  },
  activityLogs: {
    title: 'Activity Logs',
    path: '/activity-logs',
    idKey: 'log_id',
    icon: Activity,
    columns: ['log_id', 'activity', 'description', 'time', 'uid'],
    fields: [
      { name: 'activity', label: 'Activity', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'time', label: 'Time', type: 'datetime-local' },
      { name: 'uid', label: 'User ID', type: 'number' },
    ],
  },
};

const initialDashboard = {
  stats: [],
  pets: [],
  shelters: [],
  fosterParents: [],
  medicalRecords: [],
  users: [],
  applications: [],
  stories: [],
  activityLogs: [],
};

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [activeSection, setActiveSection] = useState('pets');
  const [editingRecord, setEditingRecord] = useState(null);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);

  const sections = useMemo(
    () => Object.entries(resourceConfigs).map(([key, config]) => ({ key, ...config })),
    [],
  );

  const activeConfig = resourceConfigs[activeSection];
  const rows = dashboard[activeSection] || [];

  async function loadDashboard() {
    setLoading(true);
    try {
      setDashboard(await getDashboardData());
    } catch {
      setStatus({ type: 'error', message: 'Could not load dashboard data. Make sure the Laravel API is running.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAdmin) loadDashboard();
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: '/dashboard' }} />;
  }

  function resetForm() {
    setEditingRecord(null);
    setForm({});
    setStatus({ type: '', message: '' });
  }

  function openCreate() {
    setEditingRecord(null);
    setForm(defaultFormFor(activeConfig));
    setStatus({ type: '', message: '' });
  }

  function openEdit(row) {
    const nextForm = {};
    activeConfig.fields.forEach((field) => {
      if (field.type === 'file' || field.name === 'password') return;
      nextForm[field.name] = row[field.name] ?? '';
    });
    setEditingRecord(row);
    setForm(nextForm);
    setStatus({ type: '', message: '' });
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = buildPayload(activeConfig.fields, form, Boolean(editingRecord));

    try {
      setStatus({ type: '', message: '' });
      if (editingRecord) {
        await updateResource(activeConfig.path, editingRecord[activeConfig.idKey], payload);
        setStatus({ type: 'success', message: `${activeConfig.title} updated successfully.` });
      } else {
        await createResource(activeConfig.path, payload);
        setStatus({ type: 'success', message: `${activeConfig.title} item added successfully.` });
      }
      resetForm();
      await loadDashboard();
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors).flat()[0] : null;
      setStatus({ type: 'error', message: firstError || err.response?.data?.message || 'The action failed. Please check the form.' });
    }
  }

  async function handleDelete(row) {
    const id = row[activeConfig.idKey];
    if (!window.confirm(`Delete ${activeConfig.title} record #${id}?`)) return;

    try {
      await deleteResource(activeConfig.path, id);
      setStatus({ type: 'success', message: `${activeConfig.title} record deleted.` });
      await loadDashboard();
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Delete failed.' });
    }
  }

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="Admin dashboard"
        title="Manage the full adoption system from one place."
        description="Use the same CRUD panel to add, edit, delete, and upload pictures for pets, users, and success stories."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((stat, index) => (
          <div key={stat.label} className="soft-card">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
            <p className="mt-3 text-4xl font-black text-brand-navy">{stat.value}</p>
            <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${index % 2 === 0 ? 'from-brand-pink to-brand-coral' : 'from-brand-blue to-brand-teal'}`} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[280px_1fr]">
        <aside className="soft-card h-fit">
          <div className="space-y-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.key);
                    resetForm();
                  }}
                  className={`flex w-full items-center gap-3 rounded-[24px] px-4 py-3 text-left font-semibold transition ${
                    active ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-rose-50 hover:text-brand-pink'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {section.title}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="soft-card overflow-hidden">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">Current section</p>
              <h2 className="mt-2 text-3xl font-black text-brand-navy">{activeConfig.title}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-secondary" onClick={loadDashboard}>
                Refresh
              </button>
              <button type="button" className="btn-primary" onClick={openCreate}>
                Add New
              </button>
            </div>
          </div>

          {status.message ? (
            <div className={`mb-5 rounded-2xl p-4 text-sm font-semibold ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
              {status.message}
            </div>
          ) : null}

          {(Object.keys(form).length > 0 || editingRecord) ? (
            <form onSubmit={handleSubmit} className="mb-6 rounded-[28px] bg-rose-50/70 p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-xl font-black text-brand-navy">{editingRecord ? 'Edit record' : 'Add new record'}</h3>
                <button type="button" className="btn-secondary !px-4 !py-2" onClick={resetForm}>
                  Cancel
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {activeConfig.fields.map((field) => (
                  <FieldInput
                    key={field.name}
                    field={field}
                    value={form[field.name] ?? ''}
                    editing={Boolean(editingRecord)}
                    onChange={updateField}
                  />
                ))}
              </div>
              <button type="submit" className="btn-primary mt-5">
                {editingRecord ? 'Save Changes' : 'Create Record'}
              </button>
            </form>
          ) : null}

          <div className="overflow-x-auto">
            {loading ? (
              <p className="rounded-3xl bg-slate-50 p-6 text-center text-slate-500">Loading dashboard data...</p>
            ) : rows.length ? (
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr className="text-left text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                    {activeConfig.columns.map((key) => (
                      <th key={key} className="px-4 py-3">{formatHeading(key)}</th>
                    ))}
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {rows.map((row) => (
                    <tr key={row[activeConfig.idKey]}>
                      {activeConfig.columns.map((key) => (
                        <td key={key} className="max-w-xs px-4 py-4">
                          {key.includes('photo') ? (
                            <img src={getMediaUrl(row[key])} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                          ) : (
                            <span className="line-clamp-3">{String(row[key] ?? '')}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button type="button" className="rounded-full bg-rose-50 px-3 py-2 font-semibold text-brand-pink" onClick={() => openEdit(row)}>
                            Edit
                          </button>
                          <button type="button" className="rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-600" onClick={() => handleDelete(row)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="rounded-3xl bg-slate-50 p-6 text-center text-slate-500">No records found. Click Add New to create one.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function FieldInput({ field, value, editing, onChange }) {
  const required = Boolean(field.required || (field.createOnlyRequired && !editing));
  const commonProps = {
    id: field.name,
    name: field.name,
    required,
    value,
    onChange: (event) => onChange(field.name, event.target.value),
  };

  const wrapperClass = field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : '';

  return (
    <label className={`${wrapperClass} text-sm font-bold text-slate-600`}>
      {field.label}
      {field.type === 'textarea' ? (
        <textarea className="mt-2 w-full" rows={4} {...commonProps} />
      ) : field.type === 'select' ? (
        <select className="mt-2 w-full" {...commonProps}>
          <option value="">Select {field.label}</option>
          {field.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : field.type === 'file' ? (
        <input className="mt-2 w-full" type="file" accept="image/*" onChange={(event) => onChange(field.name, event.target.files?.[0] || null)} />
      ) : (
        <input className="mt-2 w-full" type={field.type || 'text'} {...commonProps} />
      )}
    </label>
  );
}

function defaultFormFor(config) {
  return config.fields.reduce((result, field) => {
    result[field.name] = field.type === 'file' ? null : '';
    if (field.name === 'adopt_status') result[field.name] = 'Available';
    if (field.name === 'user_type') result[field.name] = 'ADOPTER';
    if (field.name === 'status') result[field.name] = 'Pending';
    if (field.name === 'submission_date' || field.name === 'date') result[field.name] = new Date().toISOString().slice(0, 10);
    return result;
  }, {});
}

function buildPayload(fields, form, editing) {
  return fields.reduce((payload, field) => {
    const value = form[field.name];
    if (field.name === 'password' && editing && !value) return payload;
    if (field.type === 'file' && !value) return payload;
    payload[field.name] = value ?? '';
    return payload;
  }, {});
}

function formatHeading(value) {
  return value.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
}
