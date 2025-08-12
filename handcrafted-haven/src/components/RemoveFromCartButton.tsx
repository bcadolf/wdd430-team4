'use client';

export default function RemoveFromCartButton({ product_id }: { product_id: string }) {
  const handleRemove = async () => {
    if (!confirm('Remove this item from your cart?')) {
      return;
    }

    try {
      console.log('Removing product:', product_id);
      
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_id })
      });

      const data = await response.json();
      console.log('Remove response:', response.status, data);

      if (response.ok && data.success) {
        alert('Item removed from cart!');
        // Refresh the page to show updated cart
        window.location.reload();
      } else {
        alert(`Failed to remove item: ${data.error}`);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error removing item from cart');
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="text-red-500 hover:text-red-700 px-3 py-1 border border-red-500 rounded hover:bg-red-50 transition"
    >
      Remove
    </button>
  );
}