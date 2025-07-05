export const ActivitiesFAQ = () => {
    const faqs = [
        {
            question: 'Where can I book a Balloon Safari?',
            answer: 'You can book through our certified tour operators or directly at Serengeti National Park info center.'
        },
        {
            question: 'Is there an age limit for hiking?',
            answer: 'Most hikes are open to ages 10 and up, but some mountain trails may have restrictions.'
        },
        {
            question: 'Do I need a guide for walking safaris?',
            answer: 'Yes, all walking safaris must be accompanied by a licensed guide for your safety.'
        }
    ];

    return (
        <section className="py-12 bg-white max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border rounded p-4">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
