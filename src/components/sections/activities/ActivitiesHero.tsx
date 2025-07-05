export default function ActivitiesHero() {
    return (
        <section className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center" style={{ backgroundImage: 'url(/images/activities-hero.jpg)' }}>
            <div className="bg-black bg-opacity-50 p-8 rounded-xl text-center">
                <h1 className="text-4xl font-bold mb-4">Explore Tourism Activities in Tanzania</h1>
                <p className="text-lg">Find your perfect adventure — from safaris to mountaineering</p>
            </div>
        </section>
    );
}