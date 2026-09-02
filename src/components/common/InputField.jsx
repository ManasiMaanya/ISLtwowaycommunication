import React from 'react';
import { Search } from 'lucide-react';

export function InputField({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  hint,
  icon = null,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-coral">*</span>}
        </label>
      )}
      <div style={{ position: 'relative', width: '100%' }}>
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim-on-dark)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="form-input"
          style={icon ? { paddingLeft: '42px' } : undefined}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-xs text-muted mt-1">{hint}</p>}
      {error && <p className="text-xs text-coral mt-1">{error}</p>}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search signs, phrases, or sessions...', className = '', ...props }) {
  return (
    <InputField
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={<Search size={17} />}
      className={className}
      {...props}
    />
  );
}

export function SelectField({
  label,
  id,
  options = [],
  value,
  onChange,
  error,
  hint,
  required = false,
  className = '',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-coral">*</span>}
        </label>
      )}
      <select
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
        className="form-select"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#1c3a32', color: '#fbf9f4' }}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error && <p className="text-xs text-muted mt-1">{hint}</p>}
      {error && <p className="text-xs text-coral mt-1">{error}</p>}
    </div>
  );
}

export function ToggleSwitch({ checked, onChange, label, description, id }) {
  const toggleId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : 'toggle');

  return (
    <label
      htmlFor={toggleId}
      className="flex items-center justify-between gap-4 p-3 rounded-lg cursor-pointer"
      style={{
        background: 'rgba(32, 67, 58, 0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)'
      }}
    >
      <div>
        <div className="text-sm font-semibold text-primary">{label}</div>
        {description && <div className="text-xs text-muted">{description}</div>}
      </div>
      <div style={{ position: 'relative', width: '46px', height: '24px' }}>
        <input
          id={toggleId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: checked ? 'var(--color-coral-500)' : 'var(--color-forest-700)',
            borderRadius: 'var(--radius-full)',
            transition: 'background-color 0.25s',
            border: '1px solid var(--border-medium)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: checked ? '24px' : '2px',
              width: '18px',
              height: '18px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              transition: 'left 0.25s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}
          />
        </div>
      </div>
    </label>
  );
}
