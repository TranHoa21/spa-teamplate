export const RegulationsSection = () => {
    const rules = [
        'Do not feed or disturb wildlife.',
        'Stay on marked trails and roads.',
        'Camping is only allowed in designated areas.',
        'Littering is strictly prohibited.',
        'All walking safaris must be guided.'
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Park Regulations</h2>
                <p className="text-gray-600 text-center mb-8">To ensure your safety and protect our wildlife, please follow these regulations during your visit.</p>
                <ul className="space-y-4 list-disc list-inside text-gray-700">
                    {rules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
