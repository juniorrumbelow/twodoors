import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, writeBatch, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { MOCK_PROPERTIES } from '../../utils/mockData';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

const NEW_IDS = new Set(MOCK_PROPERTIES.map(p => p.id));

export default function MigratePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!user) return;
    getDocs(collection(db, 'properties')).then(snap => {
      setProperties(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [user, result]);

  async function runMigration() {
    setStatus('running');
    setResult(null);
    try {
      const snapshot = await getDocs(collection(db, 'properties'));

      // Delete all old documents not in the new set
      const toDelete = snapshot.docs.filter(d => !NEW_IDS.has(d.id));
      await Promise.all(toDelete.map(d => deleteDoc(doc(db, 'properties', d.id))));

      // Write all 25 Winkworth properties in batches of 25
      // (Firestore batch limit is 500, so one batch is fine here)
      const batch = writeBatch(db);
      MOCK_PROPERTIES.forEach(property => {
        batch.set(doc(db, 'properties', property.id), {
          ...property,
          createdAt: serverTimestamp(),
        });
      });
      await batch.commit();

      // Also upsert the Winkworth Hellesdon agent record
      const agentBatch = writeBatch(db);
      agentBatch.set(doc(db, 'agents', 'agent_winkworth_hellesdon'), {
        id: 'agent_winkworth_hellesdon',
        name: 'Winkworth',
        branchName: 'Hellesdon',
        email: 'hellesdon@winkworth.co.uk',
        phone: '01603 123456',
        website: 'https://winkworth.co.uk',
        logo: 'https://ui-avatars.com/api/?name=W&background=01bf8f&color=fff',
        updatedAt: serverTimestamp(),
      }, { merge: true });
      await agentBatch.commit();

      setResult({
        success: true,
        written: MOCK_PROPERTIES.map(p => ({ id: p.id, title: p.title })),
        deleted: toDelete.map(d => d.id),
      });
      setStatus('done');
    } catch (err) {
      setResult({ success: false, error: err.message });
      setStatus('error');
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">You must be signed in to run migrations.</p>
          <button onClick={() => router.push('/login')} className="bg-green-500 text-white px-6 py-2 rounded-full">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const incoming = properties.filter(p => NEW_IDS.has(p.id));
  const outgoing = properties.filter(p => !NEW_IDS.has(p.id));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Seed Winkworth Hellesdon Properties</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Replaces all existing Firestore properties with 25 real listings from Winkworth Hellesdon.
          {outgoing.length > 0 && (
            <span className="text-orange-600"> {outgoing.length} existing document{outgoing.length !== 1 ? 's' : ''} will be deleted.</span>
          )}
        </p>

        <button
          onClick={runMigration}
          disabled={status === 'running'}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          {status === 'running' ? 'Seeding…' : `Seed ${MOCK_PROPERTIES.length} properties`}
        </button>

        {result && (
          <div className={`mt-6 p-6 rounded-2xl border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {result.success ? (
              <>
                <p className="font-semibold text-green-800 mb-1">
                  ✓ {result.written.length} properties written
                  {result.deleted.length > 0 && `, ${result.deleted.length} old documents deleted`}
                </p>
                <ul className="mt-3 space-y-1 max-h-64 overflow-y-auto">
                  {result.written.map(p => (
                    <li key={p.id} className="text-sm text-green-700">
                      <span className="font-mono text-xs text-green-400 mr-2">{p.id}</span>
                      {p.title}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-red-700 font-medium">Error: {result.error}</p>
            )}
          </div>
        )}

        {properties.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Current Firestore ({properties.length} docs)
            </h2>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="text-left px-4 py-2">ID</th>
                    <th className="text-left px-4 py-2">Title</th>
                    <th className="text-left px-4 py-2">Beds</th>
                    <th className="text-left px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {properties.map(p => {
                    const isNew = NEW_IDS.has(p.id);
                    const damaged = !p.title || p.bedrooms === undefined;
                    return (
                      <tr key={p.id} className={!isNew ? 'bg-orange-50' : ''}>
                        <td className="px-4 py-2 font-mono text-xs text-gray-400 max-w-[90px] truncate">{p.id}</td>
                        <td className="px-4 py-2 text-gray-800">
                          {damaged ? <span className="text-red-500 italic">damaged</span> : p.title}
                        </td>
                        <td className="px-4 py-2 text-gray-600">{p.bedrooms ?? '—'}</td>
                        <td className="px-4 py-2 text-xs font-medium">
                          {isNew
                            ? <span className="text-green-600">keep</span>
                            : <span className="text-orange-500">delete</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
