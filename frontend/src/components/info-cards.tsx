export function InfoCards() {
  const cards = [
    { title: 'PAGAMENTOS', subtitle: 'PELO PIX' },
    { title: 'SOBRE', subtitle: 'MOLHOS' },
    { title: 'SOBRE', subtitle: 'ENTREGAS' },
    { title: 'SOBRE', subtitle: 'PROMOÇÕES' },
  ]

  return (
    <div className='grid grid-cols-4 gap-4 mb-6'>
      {cards.map((card, index) => (
        <div
          key={index}
          className='bg-white border border-gray-200 rounded-lg p-6 text-center'
        >
          <div className='w-full h-20 bg-gray-100 border border-gray-300 rounded mb-4 flex items-center justify-center'>
            <div className='text-gray-400 text-xs'>Imagem</div>
          </div>
          <div className='font-semibold text-sm'>{card.title}</div>
          <div className='font-semibold text-sm'>{card.subtitle}</div>
        </div>
      ))}
    </div>
  )
}

